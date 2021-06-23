import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useProfileInfo = () => {
  const { profiles, profileSelected } = useSelector((state) => state.Profile);
  const naturalProfile = profiles.find((profile) => profile.type === "natural");
  const [profileInfo, setProfileInfo] = useState({
    ...profileSelected,
    selected: !!profileSelected,
    first_name: naturalProfile.first_name,
    last_name: naturalProfile.last_name,
    document_type: naturalProfile.document_type,
    document_identification: naturalProfile.document_identification,
    identity_photo: naturalProfile.identity_photo,
    identity_photo_two: naturalProfile.identity_photo_two,
  });

  const [profileCompleted, setProfileCompleted] = useState(0);

  useEffect(() => {
    setProfileInfo({
      ...profileSelected,
      selected: !!profileSelected,
      pep: !!+naturalProfile.pep,
      identity_sex: naturalProfile.identity_sex,
      first_name: naturalProfile.first_name,
      last_name: naturalProfile.last_name,
      document_type: naturalProfile.document_type,
      document_identification: naturalProfile.document_identification,
      identity_photo: naturalProfile.identity_photo,
      identity_photo_two: naturalProfile.identity_photo_two,
    });
  }, [profileSelected, naturalProfile]);

  const isAddress = !!profileInfo.address;
  const isFrontPhoto = !!profileInfo.identity_photo;
  const isRearPhoto = !!profileInfo.identity_photo_two;

  useEffect(() => {
    if (!isAddress && !isFrontPhoto && !isRearPhoto) setProfileCompleted(33);
    if ((isAddress && !isFrontPhoto && !isRearPhoto) || (!isAddress && isFrontPhoto && !isRearPhoto) || (!isAddress && !isFrontPhoto && isRearPhoto)) setProfileCompleted(66);
    if ((isAddress && isFrontPhoto && !isRearPhoto) || (isAddress && !isFrontPhoto && isRearPhoto) || (!isAddress && isFrontPhoto && isRearPhoto)) setProfileCompleted(88);
    if (isAddress && isFrontPhoto && isRearPhoto) setProfileCompleted(100);
  }, [profileInfo, isAddress, isFrontPhoto, isRearPhoto]);

  return { profileInfo, profileCompleted, isCompleted: { isAddress, isFrontPhoto, isRearPhoto } };
};
