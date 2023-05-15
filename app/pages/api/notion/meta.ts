// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ogs from "open-graph-scraper";

type Metadata = {
  ogDescription?: string;
  ogTitle?: string;
  ogUrl?: string;
  ogSiteName?: string;
  twitterCard?: string;
  twitterUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  ogImage?: {
    url?: string;
    width?: number | string | null;
    height?: number | string | null;
    type?: string;
  };
  ogLocale?: string;
  ogDate?: string;
  favicon?: string;
  charset?: string;
  requestUrl?: string;
  success?: boolean;
};

// [GET] /api/meta?url={url}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Metadata | any>
) {
  const { url } = req.query;
  if (url) {
    ogs(
      { url: typeof url === "string" ? url : url[0] },
      (error, results, response) => {
        // console.log('error:', error); // This returns true or false. True if there was an error. The error itself is inside the results object.
        // console.log('results:', results); // This contains all of the Open Graph results
        // console.log('response:', response); // This contains the HTML of page
        // console.log({ results });

        res.status(200).json({ ...(results || {}) });
      }
    );
  } else {
    res.status(200).json("no url");
  }
}

/* 아래는 참조 가능한 results로 부터 얻을 수 있는 정보들입니다. */
interface OpenGraphProperties {
  [key: string]: string | undefined;
  alAndroidAppName?: string | undefined;
  alAndroidClass?: string | undefined;
  alAndroidPackage?: string | undefined;
  alAndroidUrl?: string | undefined;
  alIosAppName?: string | undefined;
  alIosAppStoreId?: string | undefined;
  alIosUrl?: string | undefined;
  alIpadAppName?: string | undefined;
  alIpadAppStoreId?: string | undefined;
  alIpadUrl?: string | undefined;
  alIphoneAppName?: string | undefined;
  alIphoneAppStoreId?: string | undefined;
  alIphoneUrl?: string | undefined;
  alWebShouldFallback?: string | undefined;
  alWebUrl?: string | undefined;
  alWindowsAppId?: string | undefined;
  alWindowsAppName?: string | undefined;
  alWindowsPhoneAppId?: string | undefined;
  alWindowsPhoneAppName?: string | undefined;
  alWindowsPhoneUrl?: string | undefined;
  alWindowsUniversalAppId?: string | undefined;
  alWindowsUniversalAppName?: string | undefined;
  alWindowsUniversalUrl?: string | undefined;
  alWindowsUrl?: string | undefined;
  articleAuthor?: string | undefined;
  articleExpirationTime?: string | undefined;
  articleModifiedTime?: string | undefined;
  articlePublishedTime?: string | undefined;
  articlePublisher?: string | undefined;
  articleSection?: string | undefined;
  articleTag?: string | undefined;
  author?: string | undefined;
  bookAuthor?: string | undefined;
  bookCanonicalName?: string | undefined;
  bookIsbn?: string | undefined;
  bookReleaseDate?: string | undefined;
  booksBook?: string | undefined;
  booksRatingScale?: string | undefined;
  booksRatingValue?: string | undefined;
  bookTag?: string | undefined;
  businessContactDataCountryName?: string | undefined;
  businessContactDataLocality?: string | undefined;
  businessContactDataPostalCode?: string | undefined;
  businessContactDataRegion?: string | undefined;
  businessContactDataStreetAddress?: string | undefined;
  dcContributor?: string | undefined;
  dcCoverage?: string | undefined;
  dcCreator?: string | undefined;
  dcDate?: string | undefined;
  dcDateCreated?: string | undefined;
  dcDateIssued?: string | undefined;
  dcDescription?: string | undefined;
  dcFormatMedia?: string | undefined;
  dcFormatSize?: string | undefined;
  dcIdentifier?: string | undefined;
  dcLanguage?: string | undefined;
  dcPublisher?: string | undefined;
  dcRelation?: string | undefined;
  dcRights?: string | undefined;
  dcSource?: string | undefined;
  dcSubject?: string | undefined;
  dcTitle?: string | undefined;
  dcType?: string | undefined;
  modifiedTime?: string | undefined;
  musicAlbum?: string | undefined;
  musicAlbumDisc?: string | undefined;
  musicAlbumTrack?: string | undefined;
  musicAlbumUrl?: string | undefined;
  musicCreator?: string | undefined;
  musicDuration?: string | undefined;
  musicMusician?: string | undefined;
  musicReleaseDate?: string | undefined;
  musicSong?: string | undefined;
  musicSongDisc?: string | undefined;
  musicSongTrack?: string | undefined;
  musicSongUrl?: string | undefined;
  ogArticleAuthor?: string | undefined;
  ogArticleExpirationTime?: string | undefined;
  ogArticleModifiedTime?: string | undefined;
  ogArticlePublishedTime?: string | undefined;
  ogArticlePublisher?: string | undefined;
  ogArticleSection?: string | undefined;
  ogArticleTag?: string | undefined;
  ogAudio?: string | undefined;
  ogAudioSecureURL?: string | undefined;
  ogAudioType?: string | undefined;
  ogAudioURL?: string | undefined;
  ogAvailability?: string | undefined;
  ogDate?: string | undefined;
  ogDescription?: string | undefined;
  ogDeterminer?: string | undefined;
  ogImage?: string | undefined;
  ogImageHeight?: string | undefined;
  ogImageSecureURL?: string | undefined;
  ogImageType?: string | undefined;
  ogImageURL?: string | undefined;
  ogImageWidth?: string | undefined;
  ogLocale?: string | undefined;
  ogLocaleAlternate?: string | undefined;
  ogLogo?: string | undefined;
  ogPriceAmount?: string | undefined;
  ogPriceCurrency?: string | undefined;
  ogProductAvailability?: string | undefined;
  ogProductCondition?: string | undefined;
  ogProductPriceAmount?: string | undefined;
  ogProductPriceCurrency?: string | undefined;
  ogProductRetailerItemId?: string | undefined;
  ogSiteName?: string | undefined;
  ogTitle?: string | undefined;
  ogType?: string | undefined;
  ogUrl?: string | undefined;
  ogVideo?: string | undefined;
  ogVideoActorId?: string | undefined;
  ogVideoHeight?: string | undefined;
  ogVideoSecureURL?: string | undefined;
  ogVideoType?: string | undefined;
  ogVideoWidth?: string | undefined;
  placeLocationLatitude?: string | undefined;
  placeLocationLongitude?: string | undefined;
  profileFirstName?: string | undefined;
  profileGender?: string | undefined;
  profileLastName?: string | undefined;
  profileUsername?: string | undefined;
  publishedTime?: string | undefined;
  releaseDate?: string | undefined;
  restaurantContactInfoCountryName?: string | undefined;
  restaurantContactInfoEmail?: string | undefined;
  restaurantContactInfoLocality?: string | undefined;
  restaurantContactInfoPhoneNumber?: string | undefined;
  restaurantContactInfoPostalCode?: string | undefined;
  restaurantContactInfoRegion?: string | undefined;
  restaurantContactInfoStreetAddress?: string | undefined;
  restaurantContactInfoWebsite?: string | undefined;
  restaurantMenu?: string | undefined;
  restaurantRestaurant?: string | undefined;
  restaurantSection?: string | undefined;
  restaurantVariationPriceAmount?: string | undefined;
  restaurantVariationPriceCurrency?: string | undefined;
  twitterAppIdGooglePlay?: string | undefined;
  twitterAppIdiPad?: string | undefined;
  twitterAppIdiPhone?: string | undefined;
  twitterAppNameGooglePlay?: string | undefined;
  twitterAppNameiPad?: string | undefined;
  twitterAppNameiPhone?: string | undefined;
  twitterAppUrlGooglePlay?: string | undefined;
  twitterAppUrliPad?: string | undefined;
  twitterAppUrliPhone?: string | undefined;
  twitterCard?: string | undefined;
  twitterCreator?: string | undefined;
  twitterCreatorId?: string | undefined;
  twitterDescription?: string | undefined;
  twitterImage?: string | undefined;
  twitterImageAlt?: string | undefined;
  twitterImageHeight?: string | undefined;
  twitterImageSrc?: string | undefined;
  twitterImageWidth?: string | undefined;
  twitterPlayer?: string | undefined;
  twitterPlayerHeight?: string | undefined;
  twitterPlayerStream?: string | undefined;
  twitterPlayerStreamContentType?: string | undefined;
  twitterPlayerWidth?: string | undefined;
  twitterSite?: string | undefined;
  twitterSiteId?: string | undefined;
  twitterTitle?: string | undefined;
  twitterUrl?: string | undefined;
  updatedTime?: string | undefined;
}
