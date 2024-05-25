import { SchedulerConfig } from '@bryntum/scheduler';

export const schedulerConfig: Partial<SchedulerConfig> = {
    columns : [
        { text : 'Name', field : 'name', width : 1000}
    ],
    startDate : new Date(2022, 0, 1),
    endDate   : new Date(2022, 0, 10)
};