<template>

  <div class="ds-week">

    <template v-for="(day, i) in days" :key="i">

      <ds-day
        :day="day"
        :calendar="calendar"
        :placeholder="placeholder"
        :placeholder-for-create="placeholderForCreate"
      ></ds-day>

    </template>

  </div>

</template>

<script>
import { Calendar, CalendarEvent } from 'dayspan';
import DsDay from './Day';


export default {
  components: {
    DsDay
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
    }
  },

  methods:
  {
  }
}
</script>

<style scoped lang="scss">

.ds-week {
  display: flex;
  flex: 1;
}

</style>
