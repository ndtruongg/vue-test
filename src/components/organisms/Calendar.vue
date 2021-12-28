<template>
  <div class="calendar">
    <div class="calendar-head">
      <h1>Calendar</h1>

      <div class="calendar-remote">
        <button class="btn-remote" @click="changeWeek('prev')">
          <span class="material-icons-round">
            arrow_back_ios
          </span>
        </button>

        <button @click="changeWeek('reset')">
          <span class="material-icons-round">
            restart_alt
          </span>
        </button>

        <button class="btn-remote" @click="changeWeek('next')">
          <span class="material-icons-round">
            arrow_forward_ios
          </span>
        </button>
      </div>
    </div>

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
                  getDate(date, 'MM/DD/YYYY')
                )"
                :key="key"
                class="ev"
                :style="{
                  width:
                    getDiffBetween2Date(item.startDate, item.endDate) *
                      (100 / 7) -
                    0.4 +
                    '%',
                  top: getTop(date - 1) + key * 25 + 'px',
                  left: getLeftVal(item.startDate) * (100 / 7) + '%',
                }"
              >
                {{ item.title }}
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
          date: "12/27/2021",
          events: [
            {
              startDate: "12/27/2021",
              endDate: "12/31/2021",
              title: "merry christmas",
            },
          ],
        },
        {
          date: "12/28/2021",
          events: [
            {
              startDate: "12/28/2021",
              endDate: "12/29/2021",
              title: "prepare for new year 2022",
            },
          ],
        },
        {
          date: "12/29/2021",
          events: [
            {
              startDate: "12/29/2021",
              endDate: "12/29/2021",
              title: "happy new year",
            },
          ],
        },
        {
          date: "12/30/2021",
          events: [
            {
              startDate: "12/30/2021",
              endDate: "12/30/2021",
              title: "before the first day of new year 2020",
            },
          ],
        },
        // {
        //   date: "12/30/2021",
        //   events: [],
        // },
        {
          date: "01/01/2022",
          events: [
            {
              startDate: "01/01/2022",
              endDate: "01/02/2022",
              title: "before the first day of new year 2020",
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
      return diffDays ? diffDays + 1 : 1;
    },

    getLeftVal(startDate) {
      return dayjs(startDate).get("day") - 1;
    },

    getEventOfDay(date) {
      let es = this.eventsData.find((item) => item.date === date);

      return es ? es.events : [];
    },

    getTop(keyTarget) {
      let numberOfEventBefore = 0;
      this.eventsData.forEach((event, key) => {
        if (key <= keyTarget) {
          if (this.eventsData[keyTarget]) {
            let targetDate = new Date(this.eventsData[keyTarget].date);
            event.events.forEach((item) => {
              let evEndDate = new Date(item.endDate);
              if (targetDate <= evEndDate) {
                numberOfEventBefore += event.events.length;
              }
            });
          } else {
            numberOfEventBefore = 1;
          }
        }
      });

      let top = (numberOfEventBefore - 1) * 20;
      if (numberOfEventBefore > 0) {
        top += (numberOfEventBefore - 1) * 5;
      }

      return top;
    },

    changeWeek(type) {
      if (type === "prev") {
        this.dateObject = dayjs().week(this.dateObject.week() - 1);
      } else if (type === "next") {
        this.dateObject = dayjs().week(this.dateObject.week() + 1);
      } else {
        this.dateObject = dayjs();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/calendar.scss";
</style>
