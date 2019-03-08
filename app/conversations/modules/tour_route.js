module.exports = class TourRoute{
  intentType() {
    return [
      'get_number_of_location_in_path',
      'get_duration_to_next_location'
    ];
  };
  response(intent, content, payload){
    switch(intent){
      
    }
  }
}