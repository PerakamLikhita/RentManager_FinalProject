import {
  Button,
  CardActionArea,
  Avatar,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { createNumberFormatter } from "../utils/valueFormatter";
import { Link } from "react-router-dom";
import countryToCurrency from "country-to-currency";
import { countries } from "../utils/countryList";

const RealEstateCard = ({
  title,
  slug,
  price,
  category,
  address,
  realEstateImages,
  propertyOwner,
  fromOwnerUser,
  fromUserProfile,
}) => {
  const currentCountry = countries.find(
    (country) => country.label === address?.country
  );
  const format = createNumberFormatter(currentCountry?.code);

  return (
    <Card
      sx={{
        width: 345,
        bgcolor: "transparent",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "0 2px 5px 0 rgba(0,0,0,0.2)",
        },
        color: "#102a43",
      }}
    >
      <CardActionArea
        component={Link}
        to={
          fromOwnerUser
            ? `/owner/real-estate/${slug}`
            : `/tenant/real-estate/${slug}`
        }
      >
        <CardMedia
          component="img"
          sx={{ maxHeight: 150 }}
          image={realEstateImages[0]}
          alt={title}
        />
        <CardContent>
          <h4
            className="mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-primaryDark transition-all duration-300 ease-in-out"
            style={{ maxWidth: "31ch" }}
          >
            {title}
          </h4>
          <p className="text-sm text-gray-400">{category}</p>
          <p className="font-semibold">
            {countryToCurrency[currentCountry?.code]}{" "}
            <span>{format(price)}</span> / month
          </p>
          <p className="text-base">
            <LocationOnOutlinedIcon color="secondary" />
            {address?.streetName}, {address?.city}
          </p>
        </CardContent>
      </CardActionArea>

      {/* Render contact bar only if the user is not the owner */}
      {!fromOwnerUser && !fromUserProfile && (
        <div className="flex p-2">
          <div className="flex items-center gap-1">
            <Avatar
              src={propertyOwner?.profileImage}
              alt={propertyOwner?.firstName}
              sx={{ width: 36, height: 36 }}
            />
            <span className="font-semibold text-xs text-gray-600">
              {propertyOwner?.firstName} {propertyOwner?.lastName}
            </span>
          </div>
          <Button
            component={Link}
            to={`/tenant/owner-user/${propertyOwner?.slug}`}
            size="small"
            color="tertiary"
            variant="outlined"
            sx={{
              color: "#0496b4",
              marginLeft: "auto",
            }}
          >
            Owner Details
          </Button>
        </div>
      )}
    </Card>
  );
};

export default RealEstateCard;
