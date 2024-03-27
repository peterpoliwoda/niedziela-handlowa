// Initialise the app
$(function () {
  // List shopping Sundays for the next few years
  const handloweNiedzieleDaty = [
    // 2024
    "2024-01-28",
    "2024-03-24",
    "2024-04-28",
    "2024-06-30",
    "2024-08-25",
    "2024-12-15",
    "2024-12-22",

    // 2025
    "2025-01-26",
    "2025-04-13",
    "2025-04-27",
    "2025-06-29",
    "2025-08-31",
    "2025-12-14",
    "2025-12-21",

    // 2026
    "2026-01-25",
    "2026-03-29",
    "2026-04-26",
    "2026-06-28",
    "2026-08-30",
    "2026-12-13",
    "2026-12-20",

    // 2027
    "2027-01-31",
    "2027-03-21",
    "2027-04-25",
    "2027-06-27",
    "2027-08-29",
    "2027-12-12",
    "2027-12-19",

    // 2028
    "2028-01-30",
    "2028-04-09",
    "2028-04-30",
    "2028-06-25",
    "2028-08-27",
    "2028-12-10",
    "2028-12-17",

    // 2029
    "2029-01-28",
    "2029-03-25",
    "2029-04-29",
    "2029-06-24",
    "2029-08-26",
    "2029-12-16",
    "2029-12-23"
  ];

  const noIcon = "<span class=\"no-icon\"><i class=\"fa-solid fa-square-xmark\"></i></span>";
  const yesIcon = "<span class=\"yes-icon\"><i class=\"fa-solid fa-square-check\"></i>";
  const otherIcon = "<span class=\"other-icon\"><i class=\"fa-solid fa-calendar-days\"></i>";

  let nextNiedzielaHandlowa = '';

  // Notifications can only be sent NOW. Which makes this a poor implementation for a reminder.
  // Chrome has been experimenting with a showTrigger option which was capable of scheduling
  // web Notifications however this has been problematic to implement properly throughout all
  // operating systems. Let's skip this for now as this would require a browser tab to be
  // always open to work.

  // function showBrowserNotification(title, options) {
  //   if (Notification.permission === 'granted') {
  //     // Create a notification
  //     const notification = new Notification(title, options);
  //     // eslint-disable-next-line no-console
  //     console.log('notification.timestamp', notification.timestamp);
  //   } else if (Notification.permission !== 'denied') {
  //     // Request permission from the user
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === 'granted') {
  //         // Create a notification if permission is granted
  //         const notification = new Notification(title, options);
  //       }
  //     });
  //   }
  // }

  // $('#sendReminderNotification').click(() => {
  //   showBrowserNotification('Niedziela handlowa', {
  //     body: 'Dziś można będzie zrobić zakupy.',
  //     icon: "https://niedzielahandlowa.org/apple-touch-icon.png",
  //     requireInteraction: true
  //   });
  // });

  // use momentjs to fill in the inner html with handloweNiedzieleDaty
  function isTodayNiedzielaHandlowa() {
    const todayAsDate = moment().format('yyyy-MM-DD');
    const isNiedzielaHandlowa = handloweNiedzieleDaty.includes(todayAsDate);

    // Get the current date
    const currentDate = moment();
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDayOfWeek = currentDate.day();
    // Calculate the number of days until next Sunday (7 - currentDayOfWeek)
    const daysUntilSunday = 7 - currentDayOfWeek;
    // Add the days until next Sunday to the current date
    const nextSunday = currentDate.add(daysUntilSunday, 'days');
    // Format the date as desired (optional)
    const formattedNextSunday = nextSunday.format('YYYY-MM-DD'); // Adjust the format as needed

    // Check if today's date is within a week of a date from a list of handloweNiedzieleDaty
    const isNiedzielaHandlowaThisWeek = () => {
      if (handloweNiedzieleDaty.includes(formattedNextSunday)) {
        nextNiedzielaHandlowa = formattedNextSunday;
        return true;
      }
      return false;
    };

    const isTodaySunday = new Date().getDay() === 0;

    $('#todays-date-card').html(moment().locale('pl-pl').format('DD MMMM yyyy'));

    // Fill this year's Shopping Sundays in a div table
    const formattedDates = handloweNiedzieleDaty.filter(dataNiedzieliHandlowej => dataNiedzieliHandlowej.indexOf(moment().format('yyyy')) > -1).map(function (date) {
      const stringFormattedDate = moment(date).locale('pl-pl').format('DD MMMM');
      const formattedDateAsOthers = moment(date).format('YYYY-MM-DD');
      if (formattedDateAsOthers === formattedNextSunday) {
        return `<strong>${stringFormattedDate}</strong>`;
      } else {
        return stringFormattedDate;
      }
    });

    $('#currentYear').html(new Date().getFullYear());

    $('.all-niedziele-handlowe').html(formattedDates.join('<br>'));

    // $('#reminderDiv').hide();

    if (isNiedzielaHandlowa) {
      // Set niedziela-title-tak-nie
      $('#niedziela-title-tak-nie').html("Tak!")
      // Set niedziela-subtitle
      $('#niedziela-subtitle').html("Dzisiaj jest niedziela handlowa.");
      // Set niedziela-icon
      $('.giant-icon').html(yesIcon);
    } else if (isNiedzielaHandlowaThisWeek()) {
      // Set niedziela-title-tak-nie
      $('#niedziela-title-tak-nie').html("Tak");
      // Set niedziela-subtitle
      $('#niedziela-subtitle').html("W przyszłą niedzielę można będzie zrobić zakupy.");

      // $('#reminderDiv').show();
    } else {
      // Set niedziela-title-tak-nie
      $('#niedziela-title-tak-nie').html("Nie");

      if (isTodaySunday) {
        // Set niedziela-subtitle
        $('#niedziela-subtitle').html("Niestety. Dzisiaj sklepy są nieczynne.");
        // Set niedziela-icon
        $('.giant-icon').html(noIcon);

        // Today's Day Card colour
        $('.todays-date-card').css('background', '#ff9da7');
      } else {
        $('#niedziela-subtitle').html(`Dzisiaj jest ${moment().locale("pl-pl").format("dddd")}.`);
        // Set niedziela-icon
        $('.giant-icon').html(otherIcon);
      }
    }
  }

  isTodayNiedzielaHandlowa();
});
