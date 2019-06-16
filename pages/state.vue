<template>
    <div class="page">
        <b-container :class="`top-expanded-${expanded}`" @dblclick="triggerExpand(true)">
            <b-row class="menu">
                <b-col cols="2"><log-file-selector /></b-col>
                <b-col cols="4"><date-picker /></b-col>
            </b-row>

            <b-row>
                <b-col cols="2"><component-selector /></b-col>
                <b-col cols="10"><state-diff /></b-col>
            </b-row>
        </b-container>

        <div :class="`bottom-expanded-${expanded}`" @dblclick="triggerExpand(false)">
            <timeline />
        </div>
    </div>
</template>

<script>
import LogFileSelector from '~/components/LogFileSelector';
import ComponentSelector from '~/components/ComponentSelector';
import Timeline from '~/components/Timeline';
import StateDiff from '~/components/StateDiff';
import DatePicker from '~/components/DatePicker';

const EXPANDED = {
    TOP: 'top',
    HALF: 'half',
    BOTTOM: 'bottom',
};

export default {
    components: {
        DatePicker,
        LogFileSelector,
        ComponentSelector,
        StateDiff,
        Timeline,
    },

    data() {
        return {
            expanded: EXPANDED.HALF,
        };
    },

    methods: {
        triggerExpand(top) {
            switch (this.expanded) {
            case EXPANDED.TOP:
                this.expanded = top
                    ? EXPANDED.HALF
                    : EXPANDED.BOTTOM;
                break;
            case EXPANDED.HALF:
                this.expanded = top
                    ? EXPANDED.TOP
                    : EXPANDED.BOTTOM;
                break;
            case EXPANDED.BOTTOM:
                this.expanded = top
                    ? EXPANDED.TOP
                    : EXPANDED.HALF;
                break;
            default:
                break;
            }
        },
    },
};
</script>

<style scoped>
.page {
    height: 100%;
}

.menu {
    margin: 10px;
}


.bottom-expanded-bottom,
.top-expanded-top {
    overflow-y: scroll;
    height: 100%;
    max-width: 100%;
}
.bottom-expanded-half,
.top-expanded-half {
    overflow-y: scroll;
    height: 50%;
    max-width: 100%;
}
.bottom-expanded-top,
.top-expanded-bottom {
    overflow-y: scroll;
    height: 0%;
    max-width: 100%;
}

.half-panel {
    overflow-y: scroll;
    height: 50%;
    max-width: 100%;
}
</style>

