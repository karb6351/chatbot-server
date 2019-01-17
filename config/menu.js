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