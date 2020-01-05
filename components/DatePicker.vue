<template>
    <date-range-picker
        v-model="range"
        time-picker
        time-picker-24-hour
        :min-date="minDate"
        :max-date="maxDate"
        :ranges="ranges"
        opens="right"
        auto-apply
    >
        <div slot="input" slot-scope="{ startDate, endDate }">
            {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
        </div>
    </date-range-picker>
</template>

<script>
import get from 'lodash/get';
import moment from 'moment';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css';

export default {

    components: {
        DateRangePicker,
    },

    computed: {
        range: {
            get() {
                return this.$store.state.logs.dateRange;
            },

            set(value) {
                this.$store.commit('logs/setRange', value);
            },
        },

        minDate() {
            return get(this.$store.state.logs.logs[0], 'timestamp');
        },

        maxDate() {
            return moment().endOf('day').utc().format();
        },

        ranges() {
            const latest = moment().add(1, 'days');
            return {
                'Last Hour': [moment().subtract(1, 'hours'), latest],
                'Last 3 Hours': [moment().subtract(3, 'hours'), latest],
                'Last 10 Hours': [moment().subtract(10, 'hours'), latest],
                'Today': [moment().startOf('day'), latest],
                'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment()],
            };
        },
    },

    methods: {
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY HH:MM');
        },
    },
};
</script>
