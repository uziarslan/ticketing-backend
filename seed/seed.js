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
      "Email Support Request",
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
      options: ["1", "2", "3", "4", "5"],
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
        "Other",
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
        "wassermaninternshipgrant@nyu.edu",
        "peacecorps@nyu.edu",
        "sps.wasserman@nyu.edu",
        "global.internships@nyu.edu",
        "career.ambassadors@nyu.edu",
        "violetnetwork@nyu.edu",
        "wasserstaff-group@nyu.edu",
        "wasserstaff-main@nyu.edu",
        "wasserstaff-brooklyn@nyu.edu",
        "wasserman.survey@nyu.edu",
        "eventteam@nyu.edu",
        "wassertech-group@nyu.edu",
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
  "Computer or Computer Accessories broken and/or slow": [
    {
      type: "text",
      heading: "Please describe the computer challenge in detail.",
    },
    {
      type: "radio",
      heading:
        "Have you restarted or shut-down your computer recently (last 5 to 7 days)?",
      options: ["Yes", "No"],
    },
    {
      type: "text",
      heading:
        "Are there any days/times that you are unavailable for your computer to be troubleshooted?",
      subHeading:
        "Please indicate whether there are times that the team should avoid working on your computer.",
    },
  ],
  "Software, Hardware or Application question": [
    {
      type: "text",
      heading: "What is the name of the software, hardware or application?",
      subHeading: "E.g. My Adobe converter isn't working.",
    },
    {
      type: "text",
      heading:
        "Please indicate your inquiry, include as much detail as possible.",
      subHeading:
        "E.g. I would like to live stream during an upcoming Webinar.  Is this possible?",
    },
    {
      type: "text",
      heading: "Are there any time constraints related to this inquiry?",
      subHeading:
        "E.g. I need this software, technology, or application for my work on X date.",
    },
  ],
  "Event support": [
    {
      type: "text",
      heading: "What is the address/location of the event?",
    },
    {
      type: "date",
      heading: "What is the date of the event?",
    },
    {
      type: "text",
      heading: "What technology/equipment is needed?",
      subHeading: "E.g. Laptops or iPads for Kiosk check-in.",
    },
    {
      type: "time",
      heading: "What is the start time of the event?",
    },
    {
      type: "time",
      heading: "What is the end time of the event?",
    },
    {
      type: "radio",
      heading: "Is coverage/support required for the entire event?",
      subHeading:
        "E.g. Can we provide set-up/break-down support only, without coverage during the duration of the event.",
      options: ["Yes", "No"],
    },
  ],
  "Inquiry: I am wondering if we have something to meet my need...": [
    {
      type: "text",
      heading: "Please explain your inquiry in detail.",
    },
  ],
  "Event Tech Loan Request": [
    {
      type: "checkbox",
      heading: "What item(s) do you need to borrow?",
      subHeading: "Check all that apply.",
      options: [
        "Laptop",
        "Ipad",
        "Mouse/Mice",
        "Extension Cord",
        "Power Cord",
        "Power Stripe",
        "Other",
      ],
    },
    {
      type: "text",
      heading: "How many items do you need to borrow?",
      subHeading:
        "Please indicate the quantity of each item selected in the previous question.",
    },
    {
      type: "date",
      heading: "What date do you need the tech loan?",
      subHeading:
        "Note:  The expectation is that you are able to receive the requested items at the Wasserman Union Square office unless otherwise determined.",
    },
    {
      type: "time",
      heading:
        "What time do you need the tech loan, on the date indicated above?",
      subHeading:
        "Note:  The expectation is that you are able to receive the requested items at the Wasserman Union Square office unless otherwise determined.",
    },
    {
      type: "date",
      heading: "What date will you return the tech loan?",
      subHeading:
        "Note:  The expectation is that you are able to return the requested items at the Wasserman Union Square office unless otherwise determined.",
    },
    {
      type: "time",
      heading: "What time will you return the tech loan?",
      subHeading:
        "Note:  The expectation is that you are able to return the requested items at the Wasserman Union Square office unless otherwise determined.",
    },
    {
      type: "radio",
      heading:
        "Will this event/request also require on-site support from the Operations Team?",
      subHeading:
        "Please note that support is not guaranteed, but we will do our best.",
      options: ["Yes", "No"],
    },
  ],
  "Email Support Request": [
    {
      type: "text",
      heading: "Your Name",
    },
    {
      type: "text",
      heading: "You want to request for?",
    },
    {
      type: "text",
      heading: "Comments releated to the issue",
    },
    {
      type: "text",
      heading: "Email",
    },
  ],
};
