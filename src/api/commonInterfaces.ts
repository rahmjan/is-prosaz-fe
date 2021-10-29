export type GENDER = "MALE" | "FEMALE";

export interface PlaceDto {
  id: number;
  town: string;
  streetName: string;
  descriptiveNum: string;
  orientationNumber: string;
  postalCode: string;
}

export interface PersonShortDto {
  name: string,
  surname: string,
  title: string,
  email: string,
  gender: GENDER;
  address: PlaceDto;
  phoneNumber: string;
}