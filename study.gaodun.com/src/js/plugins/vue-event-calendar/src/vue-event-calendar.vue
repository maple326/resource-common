<template>
    <div class="__vev_calendar-wrapper">
        <cal-panel
                :events="events"
                :calendar="calendarOptions"
                :selectedDay='selectedDayEvents.date'
                @cur-day-changed="handleChangeCurDay"
                @month-changed="handleMonthChanged">
        </cal-panel>
        <cal-events
                :selectDay="current"
                :dayEvents="selectedDayEvents"
                :locale="calendarOptions.options.locale"
                :color="calendarOptions.options.color">
            <slot :showEvents="selectedDayEvents.events"></slot>
        </cal-events>
    </div>
</template>
<script>
    import {isEqualDateStr} from './tools.js'
    import calEvents from './components/cal-events.vue'
    import calPanel from './components/cal-panel.vue'

    const inBrowser = typeof window !== 'undefined'
    export default {
        name: 'vue-event-calendar',
        components: {
            'cal-events': calEvents,
            'cal-panel': calPanel
        },
        data () {
            return {
                selectedDayEvents: {
                    date: this.current || 'all',
                    events: this.events || []  //default show all event
                }
            }
        },
        props: {
            events: {
                type: Array,
                required: true,
                default: [],
                validator (events) {
                    let validate = true
                    events.forEach((event, index) => {
                        if (!event.date) {
                            console.error('Vue-Event-Calendar-Error:' + 'Prop events Wrong at index ' + index)
                            validate = false
                        }
                    })
                    return validate
                }
            },
            current: {
                type: String
            },
            startDate: String
        },
        computed: {
            calendarOptions () {
                let dateObj = new Date()
                if (inBrowser) {
                    return window.VueCalendarBarEventBus.CALENDAR_EVENTS_DATA
                } else {
                    return {
                        options: {
                            locale: 'en', //zh
                            color: ' #f29543'
                        },
                        params: {
                            curYear: dateObj.getFullYear(),
                            curMonth: dateObj.getMonth(),
                            curDate: dateObj.getDate(),
                            curEventsDate: 'all'
                        }
                    }
                }
            },
            calendarParams () {
                let dateObj = new Date()
                if (inBrowser) {
                    return window.VueCalendarBarEventBus.CALENDAR_EVENTS_DATA.params
                } else {
                    return {
                        curYear: dateObj.getFullYear(),
                        curMonth: dateObj.getMonth(),
                        curDate: dateObj.getDate(),
                        curEventsDate: 'all'
                    }
                }
            }
        },
        created () {
            if (this.calendarParams.curEventsDate !== 'all') {
                this.handleChangeCurDay(this.calendarParams.curEventsDate)
            }
        },
        methods: {
            handleChangeCurDay (date) {
                let events = this.events.filter(function (event) {
                    return isEqualDateStr(event.date, date)
                })
                if (events.length > 0) {
                    this.selectedDayEvents = {
                        date: date,
                        events: events
                    }
                }
                this.$emit('day-changed', {
                    date: date,
                    events: events
                })
            },
            handleMonthChanged (yearMonth) {
                this.$emit('month-changed', yearMonth)
            }
        },
        watch: {
            calendarParams () {
                if (this.calendarParams.curEventsDate !== 'all') {
                    let events = this.events.filter(event => {
                        return isEqualDateStr(event.date, this.calendarParams.curEventsDate)
                    })
                    this.selectedDayEvents = {
                        date: this.calendarParams.curEventsDate,
                        events
                    }
                } else {
                    this.selectedDayEvents = {
                        date: 'all',
                        events: this.events
                    }
                }
            },
            events () {
                this.selectedDayEvents = {
                    date: this.current || 'all',
                    events: this.events || []
                }
            },
            current() {
                this.selectedDayEvents = {
                    date: this.current || 'all',
                    events: this.events || []
                }
            }
        }
    }
</script>
