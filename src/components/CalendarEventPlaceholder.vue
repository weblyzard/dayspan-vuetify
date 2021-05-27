<template>

  <v-menu
    class="ds-calendar-event-menu"
    :content-class="contentClass"
    :disabled="!hasPopover"
    v-model="menu"
    v-bind="popoverProps">

    <ds-calendar-event
      :is-placeholder-with-day="day"
      :calendar-event="placeholder"
      :calendar="calendar"
      :index="index"
    ></ds-calendar-event>

  </v-menu>

</template>

<script>
import { inject } from "vue";
import { CalendarEvent, Calendar, Day } from 'dayspan';
import DsCalendarEvent from "./CalendarEvent";

const componentName = "dsCalendarEventPlaceholder";

export default {
  name: componentName,

  components: {
    DsCalendarEvent
  },

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

    index:
    {
      type: Number,
      default: 0
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

.ds-calendar-event-menu {
  width: 100%;
  height: 18px;
  position: relative;

  .ds-calendar-event {
    height: 100%;
  }
}

</style>
