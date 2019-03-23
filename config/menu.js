module.exports = [
  {
    group_label: "General",
    menu: [
      {
        link: "/home",
        icon: "fa fa-home",
        label: "Home",
        submenu: []
      },
      {
        link: "/route",
        icon: "fas fa-route",
        label: "Route",
        submenu: []
      },
      {
        link: "/event",
        icon: "far fa-calendar-alt",
        label: "Event",
        submenu: []
      },
      {
        link: "/restaurant",
        icon: "fas fa-utensils",
        label: "Restaurant",
        submenu: []
      },
      {
        link: "#",
        icon: "fa fa-table",
        label: "Links",
        submenu: [
          {
            link: "#",
            icon: "fa fa-link",
            label: "Link1",
          },
          {
            link: "#",
            icon: "fa fa-link",
            label: "Link2",
          }
        ]
      },
      {
        link: "#",
        icon: "fa fa-info",
        label: "About",
        submenu: []
      },
    ]
  },
  {
    group_label: "Admin",
    menu: [
      {
        link: "#",
        icon: "fa fa-table",
        label: "Setting",
        submenu: []
      }
    ]
  }
]