const db = require('../../models');
const EventRepository = require('../../repository/event');
const RouteRepository = require('../../repository/route');
const { formatUserInfoLocation } = require('../../helpers/util');


class UserActiveLogger {
	constructor() {
		this.users = {};


		this.ACTION_WALK = 0;
		this.ACTION_EAT = 1;
		this.ACTION_STOP = 2;

		
	}
	createUserInfo(key, user) {
		this.users[key] = {
			user: user,
			routeId: -1,
			history: [],
			currentAction: '',
			currentCoordinate: '',
			currentEventId: '',
			lastIntent: '',
			location: {
				next: '',
				last: '',
				current: ''
			},
			generalLocalKnowledgeLocation: {
				next: '',
				last: '',
				current: '',
			},
			state: 0
		};
	}

	async moveToNextRestaurant(key){
		const user = this.getUserInfo(key);
		try{
			const route = await RouteRepository.findRouteById(user.routeId);
			// first time join the route
			if (user.location.current === ''){
				this.setCurrentLocation(key, formatUserInfoLocation(route.event[0].Restaurant, route.event[0]));
				this.setCurrentEventId(key, route.event[0].id);
			// else, simpliy move forward the location
			}else{
				this.setLastLocation(key, user.location.current);
				this.setCurrentLocation(key, user.location.next);
				this.setCurrentEventId(key, user.location.current.event_id);
			}
			
			let nextEvent = null;
			if (user.currentEventId){
				nextEvent = await EventRepository.findNextEventById(user.currentEventId);
			}
			
			if (nextEvent){
				this.setNextLocation(key, formatUserInfoLocation(nextEvent.Restaurant, nextEvent));
			}else{
				this.setNextLocation(key, '');
			}
	
			console.log(userActiveLogger.getUserInfo(key).location);
	
			return this.getUserInfo(key).location.current;
		}catch(error){
			console.log(error);
			return null;
		}
		
		
	}

	async moveToNextGeneralLocalKnowledge(key){
		const user = this.getUserInfo(key);
		const route = await db.Route.findOne({
			where: {
				id: user.routeId
			},
			include: [
				{
					model: db.Event,
					as: 'event',
					where: {
						type: 'general_local_knowledge'
					},
					order: [['order', 'ASC']],
					include: [
						{
							model: db.GeneralLocalKnowledge
						}
					]
				}
			]
		})
		if (!route.event){
			// first time join the route
			if (user.generalLocalKnowledgeLocation.current === ''){
				this.setCurrentGeneralLocalKnowledgeLocation(key, route.event[0].GeneralLocalKnowledge);
			// else, simpliy move forward the location
			}else{
				this.setLastGeneralLocalKnowledgeLocation(key, user.generalLocalKnowledgeLocation.current);
				this.setCurrentGeneralLocalKnowledgeLocation(key, user.generalLocalKnowledgeLocation.next);
			}
		}
		
		const event = await db.Event.findOne({
			where: {
				id: user.currentEventId,
			},
			include: [
				{
					model: db.Restaurant
				}
			]
		})
		const events = await db.Event.findAll({
			where: {
				route_id: user.routeId,
				type: 'general_local_knowledge'
			},
			include: [
				{
					model: db.GeneralLocalKnowledge		
				}
			],
			order: [['order', 'ASC']]
		});
		let nextEvent = null;
		for(let i = 0; i < events.length; i++){
			if (events[i].order > event.order){
				nextEvent = events[i];
				break;
			}
		}
		if (nextEvent){
			this.setNextLocation(key, nextEvent.GeneralLocalKnowledge);
		}

		return this.getUserInfo(key).generalLocalKnowledgeLocation.current;
	}


	addHistory(key, { question, answer, intent, wish, location, context }) {
		let userActiveInfo = this.users[key];
		let newHistory = [
			...userActiveInfo.history,
			{
				question,
				answer,
				intent,
				wish,
				location,
				context
			}
		];
		userActiveInfo.history = newHistory;
		this.users[key] = userActiveInfo;
	}
	addCurrentAction(key, action) {
		let userActiveInfo = this.users[key];
		userActiveInfo.currentAction = action;
		this.users[key] = userActiveInfo;
	}
	addCurrentCoordinate(key, location) {
		let userActiveInfo = this.users[key];
		userActiveInfo.currentCoordinate = location;
		this.users[key] = userActiveInfo;
	}
	addRouteId(key, routeId) {
		let userActiveInfo = this.users[key];
		userActiveInfo.routeId = routeId;
		this.users[key] = userActiveInfo;
	}
	isJoined(key){
		return this.users[key].routeId !== -1;
	}
	setNextLocation(key, location){
		let userActiveInfo = this.users[key];
		userActiveInfo.location.next = location;
		this.users[key] = userActiveInfo;
	}
	setCurrentLocation(key, location){
		let userActiveInfo = this.users[key];
		userActiveInfo.location.current = location;
		this.users[key] = userActiveInfo;
	}
	setLastLocation(key, location){
		let userActiveInfo = this.users[key];
		userActiveInfo.location.last = location;
		this.users[key] = userActiveInfo;
	}

	setLastGeneralLocalKnowledgeLocation(key, location){
		let userActiveInfo = this.users[key];
		userActiveInfo.generalLocalKnowledgeLocation.last = location;
		this.users[key] = userActiveInfo;
	}
	setNextGeneralLocalKnowledgeLocation(key, location){
		let userActiveInfo = this.users[key];
		userActiveInfo.generalLocalKnowledgeLocation.next = location;
		this.users[key] = userActiveInfo;
	}
	setCurrentGeneralLocalKnowledgeLocation(key, location){
		let userActiveInfo = this.users[key];
		userActiveInfo.generalLocalKnowledgeLocation.current = location;
		this.users[key] = userActiveInfo;
	}
	
	setState(key, state){
		let userActiveInfo = this.users[key];
		userActiveInfo.state = state;
		this.users[key] = userActiveInfo;	
	}
	setCurrentEventId(key, eventId){
		let userActiveInfo = this.users[key];
		userActiveInfo.currentEventId = eventId;
		this.users[key] = userActiveInfo;
	}

	setLastIntent(key, intent){
		let userActiveInfo = this.users[key];
		userActiveInfo.lastIntent = intent;
		this.users[key] = userActiveInfo;
	}

	getUsersInfo() {
		return this.users;
	}
	getUserInfo(key) {
		return this.users[key];
	}
	deleteUserInfo(key) {
		delete this.users[key];
	}
}

const userActiveLogger = new UserActiveLogger();

module.exports = userActiveLogger;
