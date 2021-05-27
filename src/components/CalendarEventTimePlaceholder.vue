<template>

  <v-menu
    class="ds-calendar-event-placeholder"
    :content-class="contentClass"
    :disabled="!hasPopover"
    v-model="menu"
    v-bind="popoverProps">

    <ds-calendar-event-time
      :is-placeholder-with-day="day"
      :calendar-event="placeholder"
      :calendar="calendar"
    ></ds-calendar-event-time>

    <slot name="eventCreatePopover" v-bind="{placeholder, calendar, day, close}"></slot>

  </v-menu>

</template>

<script>
import { CalendarEvent, Calendar, Day } from 'dayspan';
import { inject } from "vue";
import DsCalendarEventTime from "./CalendarEventTime";

const componentName = "dsCalendarEventTimePlaceholder";

export default {

  name: componentName,

  components: {
    DsCalendarEventTime
  },

  inject: ['$dayspan'],

  props:
  {
    placeholder:
    {
      required: true,
      type: CalendarEvent
    },

    placeholderForCreate:
    {
      type: Boolean,
      default: false
    },

    calendar:
    {
      required: true,
      type: Calendar
    },

    day:
    {
      type: Day
    },

    popoverProps:
    {
      default() {
        const $dayspan = inject("$dayspan", {});
        return $dayspan.defaults[componentName].popoverProps;
      }
    }
  },

  computed:
  {
    hasPopover()
    {
      // TODO
      // return !!this.$scopedSlots.eventCreatePopover;
      return true;
    },

    contentClass()
    {
      return this.$dayspan.fullscreenPopovers ? 'ds-fullscreen' : '';
    },

    isStart()
    {
      return this.placeholder.day.sameDay( this.day );
    },

    autoOpen()
    {
      return this.hasPopover && this.placeholderForCreate && this.isStart;
    }
  },

  data: () => ({
    menu: false
  }),

  watch:
  {
    menu: 'triggerClearPlaceholder',
    placeholderForCreate: 'openPopover'
  },

  mounted()
  {
    if (this.autoOpen)
    {
      this.menu = true;
    }
  },

  methods:
  {
    close()
    {
      this.menu = false;
    },

    openPopover(open)
    {
      if (this.isStart)
      {
        this.menu = open;
      }
    },

    triggerClearPlaceholder(open)
    {
      if (!open)
      {
        this.$emit('clear-placeholder');
      }
    }
  }
}
</script>

<style scoped lang="scss">

.ds-calendar-event-placeholder {
  position: absolute;
  right: 0px;
  left: 0px;
  top: 0px;
  padding: 0;
  margin: 0;
}

</style>
