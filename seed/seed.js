module.exports.mainPage = [
  {
    type: "text",
    heading:
      "Please indicate your name (or the requester’s name, if different than your name).",
  },
  {
    type: "radio",
    heading:
      "Please indicate the type of request/support you require, from the options below. Don’t see an option that suits best your need? Please select other and provide as much detail as possible.",
    options: [
      "Seminar/Presentation Set-up",
      "Remote work Request",
      "New Hire: Need work station & technology set-up",
      "Computer or Computer Accessories broken and/or slow",
      "Software, Hardware or Application question",
      "Event support",
      "Inquiry: I am wondering if we have something to meet my need...",
      "Event Tech Loan Request",
      "Other:",
    ],
  },
];

module.exports.subPages = {
  "Seminar/Presentation Set-up": [
    {
      type: "date",
      heading: "What is the date of your event?",
    },
    {
      type: "time",
      heading: "What is the time of the event?",
    },
    {
      type: "text",
      heading: "What is the name of your event?",
    },
    {
      type: "radio",
      heading: "What is the name of your event?",
      subHeading:
        "For Zoom, testing videos or presentations, tech student support, the team will follow-up",
      options: [
        "Tablet with card swiper",
        "IPad (only)",
        "Laptop",
        "Cables/cords for non-Wasserman laptops",
        "Microphone stands",
        "Testing videos/presentations",
        "Tech student support",
      ],
    },
    {
      type: "select",
      heading: "If you selected IPad or Laptop, how many do you need?",
      options: [
        //   Enter the selects options
      ],
    },
    {
      type: "text",
      heading:
        "Please share any additional detaisl that you need the team to know to support you.",
    },
  ],
  "Remote work Request": [
    {
      type: "checkbox",
      heading: "What support do you need?",
      options: [
        "Laptop Loan",
        "Software Installation: Cisco Jabber",
        "Software Installation: VPN",
        "Software Installation: Anti-virus",
        "Phone Help: Call Forwarding",
        "Other:",
      ],
    },
    {
      type: "text",
      heading:
        "If you selected 'Other', please be as detailed as possible for why you need the requested equipment.",
    },
    {
      type: "date",
      heading:
        "What date do you need to receive/retrieve your remote work request?",
      subHeading:
        "Note: you are beholden to university guidelines for testing for retrieval at/after/8/15/2020.",
    },
    {
      type: "date",
      heading: "What day will  you return your remote work request?",
      subHeading:
        "Note: you are beholden to university guidelines for testing for retrieval at/after/8/15/2020.",
    },
    {
      type: "text",
      heading:
        "If you selected call forwarding, please include the number you want to forward and the number to forward it to below.",
    },
  ],
  "New Hire: Need work station & technology set-up": [
    {
      type: "text",
      heading: "Where will the new hire sit?",
      subHeading: "Please provide the office number/letter.",
    },
    {
      type: "text",
      heading: "What is the new hire's netID?",
    },
    {
      type: "date",
      heading: "What is the new hire's start date?",
    },
    {
      type: "text",
      heading:
        "The new hire will receive a standard set-up: computer, keyboard, mouse and phone. Is there anything additionally the new hire will require?",
    },
    {
      type: "text",
      heading:
        "Will your new hire need Handshake? If yes, indicate which permissions below.",
      subHeading: "A description of each role is available here: [link]",
    },
    {
      type: "text",
      heading:
        "What is the phone number for the office that the new hire will sit in?",
    },
    {
      type: "text",
      heading:
        "Who was the staff member who had the phone line immediately before this new hire?",
    },
    {
      type: "checkbox",
      heading:
        "Select all of the shared calenders to which the new hire needs to be added.",
      options: [
        "Presentation Room A",
        "Presentation Room B",
        "Conference Room A",
        "Palladium 3rd Floor",
        "Wasserstaff Out of Office Calendar",
        "Employer Presentations",
        "Other: ",
      ],
    },
    {
      type: "checkbox",
      heading:
        "Select all of the aliases to which the new hire needs to be added.",
      options: [
        "career.development@nyu.edu",
        "recruitment@nyu.edu",
        "career.communications@nyu.edu",
        "career.diversity@nyu.edu",
        "gradstudentcareer@nyu.edu",
        "oncampusemployment@nyu.edu",
        "career.alumni@nyu.edu",
        //So on
      ],
    },
    {
      type: "radio",
      heading: "Will this new hire requires access to Mercury?",
      subHeading: "Provide instructions here:",
      options: ["Yes", "No"],
    },
    {
      type: "checkbox",
      heading: "Will your new hire require the following software",
      options: ["Jabber", "Zoom", "Other:"],
    },
  ],
};
