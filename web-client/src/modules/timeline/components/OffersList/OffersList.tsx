/* TODO:  error in haversine distance display. Distance should be given in KM and Miles */

import {
  EnvironmentOutlined,
  HeartOutlined,
  StarOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { firestore } from 'firebase';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { haversineDistance } from 'src/components/WebClientMap/utils';
import { OfferStatus } from 'src/models/offers';
import { OfferWithLocation as Offer } from 'src/models/offers/offersWithLocation';
import styled from 'styled-components';

const OfferItem: React.FC<OfferItemProps> = ({
  offer,
  handleOffer,
  destinationCoords,
}): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <Item>
      {/* {offer.cavUserSnapshot.displayName} */}
      <UserPic
        src={
          offer.cavUserSnapshot.displayPicture
            ? offer.cavUserSnapshot.displayPicture
            : ''
        }
        alt="Display Picture"
      />
      <UserName>{offer.cavUserSnapshot.displayName}</UserName>
      <TextVolunteer>Volunteer</TextVolunteer>
      <IconsBlock>
        <IconContainerFirst>
          <HeartOutlined />
        </IconContainerFirst>
        <TextIcon>{offer.cavUserSnapshot.casesCompleted}</TextIcon>
        <IconContainer>
          <StarOutlined />
        </IconContainer>
        <TextIcon>{offer.cavUserSnapshot.cavRatingsReceived}</TextIcon>
        <IconContainer>
          <EnvironmentOutlined />
        </IconContainer>
        <TextIcon>
          {haversineDistance(offer.address.coords, destinationCoords)}{' '}
          {t('modules.timeline.component.miles')}
        </TextIcon>
      </IconsBlock>
      <ButtonsContainer>
        <RejectButton onClick={() => handleOffer(false)}>
          <UserSwitchOutlined />
          {t('modules.timeline.component.reject')}
        </RejectButton>
        <AcceptButton onClick={() => handleOffer(true)}>
          <HeartOutlined />
          {t('modules.timeline.component.accept')}
        </AcceptButton>
      </ButtonsContainer>
    </Item>
  );
};

const OffersList: React.FC<OffersListProps> = ({
  offers,
  handleOffer,
  destinationCoords,
}): React.ReactElement => {
  const { t } = useTranslation();
  const [offersList, setOffersList] = useState<React.ReactElement<any>[]>([]);

  useEffect(() => {
    const internalOffersList: React.ReactElement<any>[] = [];
    for (const key in offers) {
      if (offers[key] && offers[key].status !== OfferStatus.rejected) {
        internalOffersList.push(
          <OfferItem
            handleOffer={(action: boolean) => handleOffer(action, key)}
            offer={offers[key]}
            destinationCoords={destinationCoords}
          />,
        );
      }
    }

    setOffersList(internalOffersList);
  }, [offers, handleOffer, setOffersList, destinationCoords]);

  return (
    // TODO fix when we have defined layout for this screen
    // TODO remove when we fix bottom panel overlaps with others(both timelinelist and offerslist)
    <div style={{ paddingBottom: '64px' }}>
      <VolunteerSelectTitle>
        {t('modules.timeline.component.OffersList')}
      </VolunteerSelectTitle>
      {offersList}
    </div>
  );
};

const Item = styled.div`
  margin: 15px 15px 0px 15px;
  padding: 20px 16px 18px 16px;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  width: -webkit-fill-available;
`;

const VolunteerSelectTitle = styled.h1`
  margin: 0;
  margin-top: 20px;
  font-size: 1.2rem;
  text-align: center;
`;

const UserPic = styled.img`
  float: left;
  width: 56px;
  height: 56px;
  margin-right: 10px;
  border-radius: 105px;
  object-fit: cover;
`;

const UserName = styled.text`
  font-size: 20px;
  font-weight: bold;
`;

const TextVolunteer = styled.text`
  display: block;
  font-weight: 900;
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.45);
`;

const IconsBlock = styled.div`
  display: block;
`;

const IconContainer = styled.div`
  color: #811e78;
  display: inline-block;
  margin-left: 12px;
`;

const IconContainerFirst = styled(IconContainer)`
  margin-left: 0;
`;

const TextIcon = styled.text`
  display: inline-block;
  font-size: 14px;
  margin-left: 10px;
`;

const RejectButton = styled(Button)`
  height: 36px;
  border-radius: 4px;
  max-width: 150px;
  width: 47%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const AcceptButton = styled(RejectButton)`
  background-color: #52c41a !important;
  color: #fff !important;
  margin-left: 14px;
`;

const ButtonsContainer = styled.div`
  margin-top: 12px;
`;

interface OffersListProps {
  offers: Record<string, Offer>;
  loading: boolean;
  destinationCoords: firebase.firestore.GeoPoint;
  handleOffer: (action: boolean, id: string) => void;
}

interface OfferItemProps {
  offer: Offer;
  handleOffer: (action: boolean) => void;
  destinationCoords: firestore.GeoPoint;
}

export default OffersList;
