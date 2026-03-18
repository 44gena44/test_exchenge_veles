import {PageData} from './pageData'
import {ProjectName} from './projectName'
import {CurrentProjectTheme} from '../theme/index'

export type ProjectData = {
    name: ProjectName
    theme: CurrentProjectTheme;
    meta: {
        title: string;
        description: string;
    };
    page: PageData;
    isTransferAbroadFeature?: boolean
}