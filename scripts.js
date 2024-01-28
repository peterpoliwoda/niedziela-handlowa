// Initialise the app
$(function () {
  isTodayNiedzielaHandlowa();
});

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

// use momentjs to fill in the inner html with handloweNiedzieleDaty
function isTodayNiedzielaHandlowa() {
  const formattedDates = handloweNiedzieleDaty.filter(dataNiedzieliHandlowej => dataNiedzieliHandlowej.indexOf(moment().format('yyyy')) > -1).map(function (date) {
    return moment(date).locale('pl-pl').format('DD MMMM');
  });

  $('#currentYear').html(new Date().getFullYear())
  $('.all-niedziele-handlowe').html(formattedDates.join('<br>'));

  const todayAsDate = moment().format('yyyy-MM-DD');
  const isNiedzielaHandlowa = handloweNiedzieleDaty.includes(todayAsDate);
  const isTodaySunday = new Date().getDay() === 0;

  $('#todays-date-card').html(moment().locale('pl-pl').format('DD MMMM yyyy'));

  if (isNiedzielaHandlowa) {
    // Set niedziela-title-tak-nie
    $('#niedziela-title-tak-nie').html("Tak!")
    // Set niedziela-subtitle
    $('#niedziela-subtitle').html("Dzisiaj jest niedziela handlowa.");
    // Set niedziela-icon
    $('.giant-icon').html(yesIcon);
  } else {
    // Set niedziela-title-tak-nie
    $('#niedziela-title-tak-nie').html("Nie")

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
