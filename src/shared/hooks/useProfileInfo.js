import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useProfileInfo = () => {
  const profileSelected = JSON.parse(sessionStorage.getItem("profileSelected"));
  const profiles = useSelector((state) => state.Profile.profiles);
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
    if (!profileSelected) {
      setProfileInfo({
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
    }
    // eslint-disable-next-line
  }, [profileSelected]);

  useEffect(() => {
    if (!profileInfo.address && !profileInfo.identity_photo) setProfileCompleted(33);
    if ((!profileInfo.address && profileInfo.identity_photo) || (profileInfo.address && !profileInfo.identity_photo)) setProfileCompleted(66);
    if (profileInfo.address && profileInfo.identity_photo && profileInfo.identity_photo_two) setProfileCompleted(100);
  }, [profileInfo]);

  return { profileInfo, profileCompleted };
};
