import { getAnalyticsOverview } from "../services/analytics/analyticsService.js";

export const getAnalyticsOverviewController = async (req, res, next) => {
    try {
        const analytics = await getAnalyticsOverview(req.userId);

        res.status(200).json(analytics);
    } catch (error) {
        next(error);
    }
};