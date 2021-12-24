<template>
  <div>
    <h1>Calendar</h1>
    <div class="tc">
      <div class="tc-head tc-row">
        <div class="tc-col">Mon</div>
        <div class="tc-col">Tue</div>
        <div class="tc-col">Web</div>
        <div class="tc-col">Thu</div>
        <div class="tc-col">Fri</div>
        <div class="tc-col">Sat</div>
        <div class="tc-col">Sun</div>
      </div>

      <div class="tc-present">
        <div class="tc-week">
          <div class="tc-base tc-row">
            <div class="tc-col"></div>
            <div class="tc-col"></div>
            <div class="tc-col"></div>
            <div class="tc-col"></div>
            <div class="tc-col"></div>
            <div class="tc-col"></div>
            <div class="tc-col"></div>
          </div>

          <div class="tc-row tc-dates">
            <div v-for="date of 7" :key="date" class="cell">
              {{ getDate(date) }}
            </div>
          </div>

          <div class="tc-events tc-row">
            <div v-for="date of 7" :key="'event' + date" class="event">
              <div
                v-for="(item, key) of getEventOfDay(
                  getDate(date, 'DD/MM/YYYY')
                )"
                :key="key"
                class="ev"
                :style="{
                  width:
                    getDiffBetween2Date(item.startDate, item.endDate) *
                      (100 / 7) +
                    '%',
                  top: key * 35 + 'px',
                  left: getLeftVal(item.startDate) * (100 / 7) + '%',
                }"
              >
                1
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "@/plugins/dayjs.js";
export default {
  name: "Calendar",
  data() {
    return {
      dateObject: dayjs(),
      eventsData: [
        {
          date: "21/12/2021",
          events: [
            {
              startDate: "12/21/2021",
              endDate: "12/25/2021",
              title: "merry christmas",
            },
            {
              startDate: "12/21/2021",
              endDate: "12/21/2021",
              title: "Test",
            },
          ],
        },
      ],
    };
  },
  computed: {
    weeksInMonth() {
      return 1;
    },
  },

  methods: {
    getDate(weekDay, type = "DD") {
      return this.dateObject.weekday(weekDay).format(type);
    },

    getDiffBetween2Date(startDate, endDate) {
      let date1 = new Date(startDate);
      let date2 = new Date(endDate);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays ? diffDays : 1;
    },

    getLeftVal(startDate) {
      return dayjs(startDate).get("day");
    },

    getEventOfDay(date) {
      let es = this.eventsData.find((item) => item.date === date);

      return es ? es.events : [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/calendar.scss";
</style>
