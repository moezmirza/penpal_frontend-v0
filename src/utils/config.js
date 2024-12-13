export const baseApi = "http://localhost:8000/api/v1";

export const websiteURL = "https://awayoutpenpals.com/";

// pagination

export const itemsPerPage = 40
export const nextPageNumber = (currLength) => {
    console.log("curCustomer lenght", currLength)
    return currLength === itemsPerPage
        ? 1
        : Math.ceil(currLength / itemsPerPage);
}