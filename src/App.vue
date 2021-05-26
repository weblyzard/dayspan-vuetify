<template>
  <calendar-app ref="app"
    :calendar="calendar"
    :read-only="readOnly"
    @change="saveState">

  </calendar-app>
</template>

<script>
import { ref, provide } from 'vue';
import { Calendar } from 'dayspan';
import CalendarApp from './components/CalendarApp.vue'
import Dayspan from './component'

export default {
  name: 'App',

  components: {
    CalendarApp,
  },
  
  setup() {
    const calendar = ref(Calendar.months());
    const readOnly = false;
    const saveState = () => {
      console.log('save state callback');
    }

    const dayspan = new Dayspan();
    dayspan.init();
    provide('$dayspan', dayspan);

    return {
      calendar,
      readOnly,
      saveState,
      dayspan
    }
  }
}
</script>
