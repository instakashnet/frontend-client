import { useEffect, useState } from "react";

export const useProfileInfo = (profiles, profileSelected) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [profileCompleted, setProfileCompleted] = useState(0);
  const naturalProfile = profiles.find((profile) => profile.type === "natural");

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
    // eslint-disable-next-line
  }, [naturalProfile]);

  useEffect(() => {
    if (!profileInfo.address && !profileInfo.identity_photo) setProfileCompleted(33);
    if ((!profileInfo.address && profileInfo.identity_photo) || (profileInfo.address && !profileInfo.identity_photo)) setProfileCompleted(66);
    if (profileInfo.address && profileInfo.identity_photo && !profileInfo.identity_photo_two) setProfileCompleted(88);
    if (profileInfo.address && profileInfo.identity_photo && profileInfo.identity_photo_two) setProfileCompleted(100);
  }, [profileInfo]);

  return { profileInfo, profileCompleted };
};
