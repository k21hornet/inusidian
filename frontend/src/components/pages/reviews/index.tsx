import { Box } from "@mui/material";
import { ReviewsPageProps } from "./typs";
import { ReviewTable } from "@/components/base/ReviewTable";
import { reviewsPageSx } from "./styles";

export const ReviewsPage = ({ decks }: ReviewsPageProps) => {
  return (
    <Box sx={reviewsPageSx}>
      <ReviewTable decks={decks} />
    </Box>
  );
};
