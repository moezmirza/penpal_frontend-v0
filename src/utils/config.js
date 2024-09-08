export const baseApi = "https://penpal-prod.vercel.app/api/v1";

export const websiteURL = "https://awayoutpenpals.com/";

// pagination

export const itemsPerPage = 40
export const nextPageNumber = (currLength) => {
    console.log("curCustomer lenght", currLength)
    return currLength === itemsPerPage
        ? 1
        : Math.ceil(currLength / itemsPerPage);
}