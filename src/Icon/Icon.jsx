import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AddNewOrganisationIcon from './svg/add-new-organisation.svg';
import Archive from './svg/archive.svg';
import Unarchive from './svg/unarchive.svg';
import ArrowIcon from './svg/arrow.svg';
import ArrowRightIcon from './svg/arrow-right.svg';
import Billable from './svg/billable.svg';
import CalendarIcon from './svg/calendar.svg';
import CloseIcon from './svg/close.svg';
import ColorIcon from './svg/color.svg';
import ChartIcon from './svg/chart.svg';
import DeleteIcon from './svg/delete.svg';
import DownloadReport from './svg/download-report.svg';
import EditIcon from './svg/edit.svg';
import EyeIcon from './svg/eye.svg';
import FrozeIcon from './svg/froze.svg';
import GoogleIcon from './svg/google-icon.svg';
import HelpIcon from './svg/help.svg';
import LayersIcon from './svg/layers.svg';
import LogoutIcon from './svg/logout.svg';
import MenuIcon from './svg/menu.svg';
import OkIcon from './svg/ok.svg';
import OrganizationIcon from './svg/organization.svg';
import ProjectIcon from './svg/project.svg';
import PlayIcon from './svg/play.svg';
import ReplayIcon from './svg/replay.svg';
import ReportIcon from './svg/report.svg';
import ReportsIcon from './svg/reports.svg';
import ReportsActionIcon from './svg/reports-action.svg';
import ReportAddIcon from './svg/report-add.svg';
import ReportEditIcon from './svg/report-edit.svg';
import ReportDeleteIcon from './svg/report-delete.svg';
import ResendIcon from './svg/resend.svg';
import SettingsIcon from './svg/settings.svg';
import TagIcon from './svg/tag.svg';
import TimerIcon from './svg/timer.svg';
import UserIcon from './svg/user.svg';
import UsersIcon from './svg/users.svg';
import SearchIcon from './svg/search.svg';
import StopIcon from './svg/round-stop.svg';
import ShareIcon from './svg/share.svg';
import TypeIcon from './svg/type.svg';
import PlusIcon from './svg/plus.svg';
import PhotoUploadBlue from './svg/photo-upload-blue.svg';
import PersonFilter from './svg/person-filter.svg';
import ViewFilter from './svg/view-filter.svg';
import ChatbotIcon from './svg/chatbot.svg';
import IntentsIcon from './svg/intents-filter.svg';

import style from './Icon.style.scss';

/** Component printing SVG icon inline. */
const
    colors = {
        none: '#fff',
        white: '#f4f6fa',
        black: '#141c26',
        blue: '#4c72f4',
        grey: '#9babaf',
        'grey-dark': '#556164',
        ecru: '#e1e3e8',
        transparent: 'transparent'
    },
    icons = {
        addNewOrganisation: <AddNewOrganisationIcon />,
        archive: <Archive />,
        arrow: <ArrowIcon />,
        arrowRight: <ArrowRightIcon />,
        billable: <Billable />,
        calendar: <CalendarIcon />,
        close: <CloseIcon />,
        color: <ColorIcon />,
        chart: <ChartIcon />,
        delete: <DeleteIcon />,
        downloadReport: <DownloadReport />,
        edit: <EditIcon />,
        eye: <EyeIcon />,
        froze: <FrozeIcon />,
        googleIcon: <GoogleIcon />,
        help: <HelpIcon />,
        layers: <LayersIcon />,
        logout: <LogoutIcon />,
        menu: <MenuIcon />,
        ok: <OkIcon />,
        organization: <OrganizationIcon />,
        project: <ProjectIcon />,
        play: <PlayIcon />,
        replay: <ReplayIcon />,
        report: <ReportIcon />,
        reports: <ReportsIcon />,
        'reports-action': <ReportsActionIcon />,
        resend: <ResendIcon />,
        'report-add': <ReportAddIcon />,
        'report-delete': <ReportDeleteIcon />,
        'report-edit': <ReportEditIcon />,
        settings: <SettingsIcon />,
        tag: <TagIcon />,
        timer: <TimerIcon />,
        user: <UserIcon />,
        users: <UsersIcon />,
        search: <SearchIcon />,
        stop: <StopIcon />,
        share: <ShareIcon />,
        type: <TypeIcon />,
        unarchive: <Unarchive />,
        plus: <PlusIcon />,
        photoUploadBlue: <PhotoUploadBlue />,
        personFilter: <PersonFilter />,
        viewFilter: <ViewFilter />,
        chatbot: <ChatbotIcon />,
        intents: <IntentsIcon />
    },
    Icon = ({icon, color, size}) => (
        <div className={cx(style.icon, style[`size-${size}`])} style={{'--color': colors[color] || color}}>
            {icons[icon]}
        </div>
    );

Icon.propTypes = {
    /** Type of icon. */
    icon: PropTypes.string.isRequired,
    /** Color of icon strokes. */
    color: PropTypes.string,
    /** Size of icon. */
    size: PropTypes.oneOf(['extra-small', 'small', 'medium', 'semi-large', 'large'])
};

Icon.defaultProps = {
    color: 'black',
    size: 'medium'
};

export default Icon;