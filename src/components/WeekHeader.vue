<template>

  <div class="ds-week-header" :style="style">

    <div class="ds-hour-list"></div>

    <template v-for="(day, i) in days" :key="i">

      <ds-week-day-header
        v-bind="$attrs"
        :day="day"
        :calendar="calendar"
        :placeholder="placeholder"
        :placeholder-for-create="placeholderForCreate"
      ></ds-week-day-header>

    </template>

  </div>

</template>

<script>
import { Calendar, CalendarEvent } from 'dayspan';
import DsWeekDayHeader from "./WeekDayHeader";

export default {
  name: 'dsWeekHeader',

  components: {
    DsWeekDayHeader
  },

  props:
  {
    days:
    {
      required: true,
      type: Array
    },

    calendar:
    {
      required: true,
      type: Calendar
    },

    placeholder:
    {
      type: CalendarEvent
    },

    placeholderForCreate:
    {
      type: Boolean,
      default: false
    },

    scrollPush:
    {
      type: Number,
      default: 0
    }
  },

  computed:
  {
    style()
    {
      return {
        marginRight: this.scrollPush + 'px'
      };
    }
  },

  methods:
  {
  }
}
</script>

<style scoped lang="scss">

.ds-week-header {
  flex: none;
  display: flex;

  .ds-hour-list {
    flex: none;
    width: 44px;
    border-right: #e0e0e0 1px solid;
    // background-color: #fafafa;
  }
}

</style>
