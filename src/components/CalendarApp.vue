<template>
  <v-app id="dayspan" v-cloak full-height>
    <v-app-bar
      border="[false, false,false]"
      density="compact"
      class="ds-app-calendar-toolbar"
      app
    >
      <v-app-bar-nav-icon
        @click.stop.prevent="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      Test
      <v-spacer></v-spacer>

      <select v-model="currentType">
        <option v-for="type in types" :key="type.id" :value="type">
          {{ type.label }}
        </option>
      </select>

      <!-- <v-menu>
          <v-btn flat>
            {{ currentType.label }}
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <template v-for="type in types" :key="type.id">
              <v-list-tile @click="currentType = type">
                <v-list-tile-content>
                  <v-list-tile-title>{{ type.label }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>{{ type.shortcut }}</v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
        </v-menu> -->
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <div class="pa-3" v-if="calendar">
        <ds-day-picker :span="calendar.span" @picked="rebuild"></ds-day-picker>
      </div>
    </v-navigation-drawer>

    <!-- <slot name="today" v-bind="{setToday, todayDate, calendar}">

        <v-tooltip bottom>
          <v-btn slot="activator"
            class="ds-skinny-button"
            depressed
            :icon="$vuetify.breakpoint.smAndDown"
            @click="setToday">

            <span v-if="$vuetify.breakpoint.mdAndUp">{{ labels.today }}</span>
            <v-icon v-else>{{ labels.todayIcon }}</v-icon>

          </v-btn>
          <span>{{ todayDate }}</span>
        </v-tooltip>

      </slot>

      <slot name="prev" v-bind="{prev, prevLabel, calendar}">

        <v-tooltip bottom>
          <v-btn slot="activator"
            icon depressed class="ds-light-forecolor ds-skinny-button"
            @click="prev" >
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
          <span>{{ prevLabel }}</span>
        </v-tooltip>

      </slot>

      <slot name="next" v-bind="{next, nextLabel, calendar}">

        <v-tooltip bottom>
          <v-btn slot="activator"
            icon depressed
            class="ds-light-forecolor ds-skinny-button"
            @click="next">
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
          <span>{{ nextLabel }}</span>
        </v-tooltip>

      </slot>

      <slot name="summary" v-bind="{summary, calendar}">

        <h1 class="title ds-light-forecolor">
          {{ summary }}
        </h1>

      </slot>

      <slot name="menuRight"></slot>
    -->

    <v-main>
      <v-container fluid fill-height class="ds-calendar-container">
        <div v-if="currentType.schedule" class="ds-expand">schedule</div>
        <div v-else class="ds-expand">
          <ds-calendar
            ref="calendar"
            :calendar="calendar"
            :read-only="readOnly"
            @add="add"
            @add-at="addAt"
            @edit="edit"
            @view-day="viewDay"
            @added="handleAdd"
            @moved="handleMove"
          ></ds-calendar>
        </div>
      </v-container>
    </v-main>

    <!-- 
          <div v-if="currentType.schedule" class="ds-expand">

            <slot name="calendarAppAgenda" v-bind="{$scopedSlots, $listeners, calendar, add, edit, viewDay}">

              <ds-agenda
                v-bind="{$scopedSlots}"
                v-on="$listeners"
                :read-only="readOnly"
                :calendar="calendar"
                @add="add"
                @edit="edit"
                @view-day="viewDay"
              ></ds-agenda>

            </slot>

          </div>-->

    <!--  <slot name="calendarAppEventDialog" v-bind="{$scopedSlots, $listeners, calendar, eventFinish}">

          <ds-event-dialog ref="eventDialog"
            v-bind="{$scopedSlots}"
            v-on="$listeners"
            :calendar="calendar"
            :read-only="readOnly"
            @saved="eventFinish"
            @actioned="eventFinish"
          ></ds-event-dialog>

        </slot>

        <slot name="calendarAppOptions" v-bind="{optionsVisible, optionsDialog, options, chooseOption}">

          <v-dialog ref="optionsDialog"
            v-model="optionsVisible"
            v-bind="optionsDialog"
            :fullscreen="$dayspan.fullscreenDialogs">
            <v-list>
              <template v-for="option in options" :key="option.text">
                <v-list-tile @click="chooseOption( option )">
                  {{ option.text }}
                </v-list-tile>
              </template>
            </v-list>
          </v-dialog>

        </slot>

        <slot name="calendarAppPrompt" v-bind="{promptVisible, promptDialog, promptQuestion, choosePrompt}">

          <v-dialog ref="promptDialog"
            v-model="promptVisible"
            v-bind="promptDialog">
            <v-card>
              <v-card-title>{{ promptQuestion }}</v-card-title>
              <v-card-actions>
                <v-btn color="primary" flat @click="choosePrompt( true )">
                  {{ labels.promptConfirm }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="secondary" flat @click="choosePrompt( false )">
                  {{ labels.promptCancel }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </slot>

        <slot name="calendarAppAdd" v-bind="{allowsAddToday, addToday}">

          <v-fab-transition v-if="!readOnly">
            <v-btn
              class="ds-add-event-today"
              color="primary"
              fixed bottom right fab
              v-model="allowsAddToday"
              @click="addToday">
              <v-icon>add</v-icon>
            </v-btn>
          </v-fab-transition>

        </slot>

        <slot name="containerInside" v-bind="{events, calendar}"></slot>
  -->
  </v-app>
</template>

<script>
import { ref, inject } from "vue";
// import { Constants, Sorts, Calendar, Day, Units, Weekday, Month, DaySpan, PatternMap, Time, Op } from 'dayspan';
import { Calendar, Sorts, Op } from "dayspan";
import DsDayPicker from "./DayPicker";
import DsCalendar from "./Calendar";

const componentName = 'dsCalendarApp';

export default {
  name: componentName,

  components: {
    DsDayPicker,
    DsCalendar,
  },

  inject: ['$dayspan'],

  props: {
    events: {
      type: Array,
    },
    calendar: {
      type: Calendar,
      default() {
        return Calendar.months();
      },
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    types: {
      type: Array,
      default() {
        const $dayspan = inject("$dayspan", {});
        return $dayspan.defaults[componentName].types;
      },
    },
  },

  computed: {
    currentType: {
      get() {
        return (
          this.types.find(
            (type) =>
              type.type === this.calendar.type &&
              type.size === this.calendar.size
          ) || this.types[0]
        );
      },
      set(type) {
        this.rebuild(undefined, true, type);
      },
    },
  },

  methods: {
    setState(state) {
      state.eventSorter = state.listTimes
        ? Sorts.List([Sorts.FullDay, Sorts.Start])
        : Sorts.Start;

      this.calendar.set(state);

      this.triggerChange();
    },

    applyEvents() {
      if (this.events) {
        this.calendar.removeEvents();
        this.calendar.addEvents(this.events);
      }
    },

    isType(type, aroundDay) {
      let cal = this.calendar;

      return (
        cal.type === type.type &&
        cal.size === type.size &&
        (!aroundDay || cal.span.matchesDay(aroundDay))
      );
    },

    rebuild(aroundDay, force, forceType) {
      let type = forceType || this.currentType || this.types[2];

      if (this.isType(type, aroundDay) && !force) {
        return;
      }

      let input = {
        type: type.type,
        size: type.size,
        around: aroundDay,
        eventsOutside: true,
        preferToday: false,
        listTimes: type.listTimes,
        updateRows: type.updateRows,
        updateColumns: type.listTimes,
        fill: !type.listTimes,
        otherwiseFocus: type.focus,
        repeatCovers: type.repeat,
      };

      this.setState(input);
    },

    next() {
      this.calendar.unselect().next();

      this.triggerChange();
    },

    prev() {
      this.calendar.unselect().prev();

      this.triggerChange();
    },

    setToday() {
      this.rebuild(this.$dayspan.today);
    },

    viewDay(day) {
      this.rebuild(day, false, this.types[0]);
    },

    edit(calendarEvent) {
      let eventDialog = this.$refs.eventDialog;

      eventDialog.edit(calendarEvent);
    },

    editPlaceholder(createEdit) {
      let placeholder = createEdit.calendarEvent;
      let details = createEdit.details;
      let eventDialog = this.$refs.eventDialog;
      let calendar = this.$refs.calendar;

      eventDialog.addPlaceholder(placeholder, details);
      eventDialog.$once("close", calendar.clearPlaceholder);
    },

    add(day) {
      if (!this.canAddDay) {
        return;
      }

      let eventDialog = this.$refs.eventDialog;
      let calendar = this.$refs.calendar;
      let useDialog = !this.hasCreatePopover;

      calendar.addPlaceholder(day, true, useDialog);

      if (useDialog) {
        eventDialog.add(day);
        eventDialog.$once("close", calendar.clearPlaceholder);
      }
    },

    addAt(dayHour) {
      if (!this.canAddTime) {
        return;
      }

      let eventDialog = this.$refs.eventDialog;
      let calendar = this.$refs.calendar;
      let useDialog = !this.hasCreatePopover;
      let at = dayHour.day.withHour(dayHour.hour);

      calendar.addPlaceholder(at, false, useDialog);

      if (useDialog) {
        eventDialog.addAt(dayHour.day, dayHour.hour);
        eventDialog.$once("close", calendar.clearPlaceholder);
      }
    },

    addToday() {
      if (!this.canAddDay) {
        return;
      }

      let eventDialog = this.$refs.eventDialog;
      let calendar = this.$refs.calendar;
      let useDialog = !this.hasCreatePopover || !calendar;

      let day = this.$dayspan.today;

      if (!this.calendar.filled.matchesDay(day)) {
        let first = this.calendar.days[0];
        let last = this.calendar.days[this.calendar.days.length - 1];
        let firstDistance = Math.abs(first.currentOffset);
        let lastDistance = Math.abs(last.currentOffset);

        day = firstDistance < lastDistance ? first : last;
      }

      calendar && calendar.addPlaceholder(day, true, useDialog);

      if (useDialog) {
        eventDialog.add(day);

        calendar && eventDialog.$once("close", calendar.clearPlaceholder);
      }
    },

    handleAdd(addEvent) {
      let eventDialog = this.$refs.eventDialog;
      let calendar = this.$refs.calendar;

      addEvent.handled = true;

      if (!this.hasCreatePopover) {
        if (addEvent.placeholder.fullDay) {
          eventDialog.add(addEvent.span.start, addEvent.span.days(Op.UP));
        } else {
          eventDialog.addSpan(addEvent.span);
        }

        eventDialog.$once("close", addEvent.clearPlaceholder);
      } else {
        calendar.placeholderForCreate = true;
      }
    },

    handleMove(moveEvent) {
      let calendarEvent = moveEvent.calendarEvent;
      let target = moveEvent.target;
      let targetStart = target.start;
      let sourceStart = calendarEvent.time.start;
      let schedule = calendarEvent.schedule;
      let options = [];

      moveEvent.handled = true;

      let callbacks = {
        cancel: () => {
          moveEvent.clearPlaceholder();
        },
        single: () => {
          calendarEvent.move(targetStart);
          this.eventsRefresh();
          moveEvent.clearPlaceholder();

          this.$emit("event-update", calendarEvent.event);
        },
        instance: () => {
          calendarEvent.move(targetStart);
          this.eventsRefresh();
          moveEvent.clearPlaceholder();

          this.$emit("event-update", calendarEvent.event);
        },
        duplicate: () => {
          schedule.setExcluded(targetStart, false);
          this.eventsRefresh();
          moveEvent.clearPlaceholder();

          this.$emit("event-update", calendarEvent.event);
        },
        all: () => {
          schedule.moveTime(sourceStart.asTime(), targetStart.asTime());
          this.eventsRefresh();
          moveEvent.clearPlaceholder();

          this.$emit("event-update", calendarEvent.event);
        },
      };

      options.push({
        text: this.labels.moveCancel,
        callback: callbacks.cancel,
      });

      if (schedule.isSingleEvent()) {
        options.push({
          text: this.labels.moveSingleEvent,
          callback: callbacks.single,
        });

        if (this.$dayspan.features.moveDuplicate) {
          options.push({
            text: this.labels.moveDuplicate,
            callback: callbacks.duplicate,
          });
        }
      } else {
        if (this.$dayspan.features.moveInstance) {
          options.push({
            text: this.labels.moveOccurrence,
            callback: callbacks.instance,
          });
        }

        if (this.$dayspan.features.moveDuplicate) {
          options.push({
            text: this.labels.moveDuplicate,
            callback: callbacks.duplicate,
          });
        }

        if (
          this.$dayspan.features.moveAll &&
          !schedule.isFullDay() &&
          targetStart.sameDay(sourceStart)
        ) {
          options.push({
            text: this.labels.moveAll,
            callback: callbacks.all,
          });
        }
      }

      this.options = options;
      this.optionsVisible = true;
    },

    chooseOption(option) {
      if (option) {
        option.callback();
      }

      this.optionsVisible = false;
    },

    choosePrompt(yes) {
      this.promptCallback(yes);
      this.promptVisible = false;
    },

    eventFinish() {
      this.triggerChange();
    },

    eventsRefresh() {
      this.calendar.refreshEvents();

      this.triggerChange();
    },

    triggerChange() {
      this.$emit("change", {
        calendar: this.calendar,
      });
    },
  },

  setup() {
    const drawer = ref(null);

    return {
      drawer,
    };
  },
};
</script>

<style lang="scss">
$control-color: #f5f5f5;

$light-color: #757575;

.ds-button-tall {
  height: 48px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.ds-textfield {
  &.v-input-group--multi-line label {
    margin-top: 6px;
  }

  > label {
    margin: 6px 8px;
  }

  .v-input-group__input input {
    background-color: $control-color;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 40px;
    padding: 10px;
  }

  .v-input-group__input textarea {
    background-color: $control-color;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 10px;
  }

  .v-input-group__details::before {
    background-color: $control-color !important;
  }

  &.inline {
    width: auto;
    display: inline-block !important;
    margin-left: 6px;
    margin-right: 6px;
    top: 14px;
    padding-top: 0px;
    margin-top: -14px;

    &.small {
      width: 60px;
    }
  }
}

.ds-dropdown {
  .v-input-group__input {
    background-color: $control-color;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 40px;
    padding: 10px;
  }

  .v-input-group__details::before {
    background-color: $control-color !important;
  }
}

.ds-button {
  background-color: $control-color !important;
  height: 40px;

  &.push-down {
    margin-top: 18px;
  }
}

.ds-light-forecolor {
  color: $light-color !important;
}

.ds-fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  max-height: auto !important;
  max-width: 100% !important;
  min-width: 100% !important;

  > * {
    height: 100%;
  }
}

.ds-app-calendar-toolbar {
  .v-toolbar__content {
    border-bottom: 1px solid rgb(224, 224, 224);
  }
}

.ds-skinny-button {
  margin-left: 2px !important;
  margin-right: 2px !important;
}

.ds-expand {
  height: 100%;
}

.ds-calendar-container {
  padding: 0px !important;
  position: relative;
  height: 100%;
}

.v-btn--floating.ds-add-event-today {
  .v-icon {
    width: 24px;
    height: 24px;
  }
}

.ds-app-calendar-toolbar {
  box-shadow: none;
  border-bottom: 1px solid #e0e0e0;
}

select {
  text-align-last: center;
  text-align: center;
  border: 1px solid #aaa;
  cursor: pointer;
}
</style>
