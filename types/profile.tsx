export interface IProfile {
  id?: number;
  bg_image_url?: object;
  profile_image_url?: object;
  name: string;
  title: string;
  description: string;
  portofolio?: IPortofolio[];
}

export interface IPortofolio {
  title: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
}
  