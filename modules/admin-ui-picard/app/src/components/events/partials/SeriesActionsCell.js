import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import ConfirmModal from "../../shared/ConfirmModal";
import {deleteSeries} from "../../../thunks/seriesThunks";
import {connect} from "react-redux";
import SeriesDetailsModal from "./modals/SeriesDetailsModal";
import {
    fetchNamesOfPossibleThemes,
    fetchSeriesDetailsAcls, fetchSeriesDetailsFeeds,
    fetchSeriesDetailsMetadata, fetchSeriesDetailsTheme
} from "../../../thunks/seriesDetailsThunks";

/**
 * This component renders the action cells of series in the table view
 */
const SeriesActionsCell = ({ row, deleteSeries, fetchSeriesDetailsMetadata, fetchSeriesDetailsAcls,
                               fetchSeriesDetailsFeeds, fetchSeriesDetailsTheme, fetchSeriesDetailsThemeNames }) => {
    const { t } = useTranslation();

    const [displayDeleteConfirmation, setDeleteConfirmation] = useState(false);
    const [displaySeriesDetailsModal, setSeriesDetailsModal] = useState(false);

    const hideDeleteConfirmation = () => {
        setDeleteConfirmation(false);
    };

    const deletingSeries = id => {
        deleteSeries(id)
    };

    const hideSeriesDetailsModal = () => {
        setSeriesDetailsModal(false);
    }

    const showSeriesDetailsModal = async () => {
        await fetchSeriesDetailsMetadata(row.id);
        await fetchSeriesDetailsAcls(row.id);
        await fetchSeriesDetailsFeeds(row.id);
        await fetchSeriesDetailsTheme(row.id);
        await fetchSeriesDetailsThemeNames();

        setSeriesDetailsModal(true);
    }

    return (
        <>

            {/*TODO: with-Role ROLE_UI_SERIES_DETAILS_VIEW*/}
            <a onClick={() => showSeriesDetailsModal()}
               className="more-series"
               title={t('EVENTS.SERIES.TABLE.TOOLTIP.DETAILS')}/>


            {displaySeriesDetailsModal && (
                <SeriesDetailsModal handleClose={hideSeriesDetailsModal}
                                    seriesId={row.id}
                                    seriesTitle={row.title}/>
            )}

            {/*TODO: with-Role ROLE_UI_SERIES_DELETE*/}
            <a onClick={() => setDeleteConfirmation(true)}
               className="remove"
               title={t('EVENTS.SERIES.TABLE.TOOLTIP.DELETE')}/>

            {displayDeleteConfirmation && (
                <ConfirmModal close={hideDeleteConfirmation}
                              resourceName={row.title}
                              resourceType="SERIES"
                              resourceId={row.id}
                              deleteMethod={deletingSeries}/>
            )}
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    deleteSeries: id => dispatch(deleteSeries(id)),
    fetchSeriesDetailsMetadata: id => dispatch(fetchSeriesDetailsMetadata(id)),
    fetchSeriesDetailsAcls: id => dispatch(fetchSeriesDetailsAcls(id)),
    fetchSeriesDetailsFeeds: id => dispatch(fetchSeriesDetailsFeeds(id)),
    fetchSeriesDetailsTheme: id => dispatch(fetchSeriesDetailsTheme(id)),
    fetchSeriesDetailsThemeNames: () => dispatch(fetchNamesOfPossibleThemes())
})

export default connect(null, mapDispatchToProps)(SeriesActionsCell);