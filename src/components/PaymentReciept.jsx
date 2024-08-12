import { roundTo } from "../utils/sharedMethods";
import { addonStatetoCost, addonStateToNameMap, basicInfoFieldLabelMap, stateFieldNameMap } from "../utils/sharedState";
function PaymentReceipt({ obj }) {
    let total = 0;
    Object.keys(obj).forEach((field) => {
        if (field == "personalityInfo" || field == "basicInfo") {
            total += Object.keys(obj[field]).reduce((acc, curr) => {
                if (obj[field][curr]) return acc + 9.95;
                return acc;
            }, 0);
        } else if (field == "wordLimit" || field == "totalPaidPhotos") {
            total += obj[field] * 9.95;
        } else {
            console.log("field", field, "cost", addonStatetoCost[field]);
            total += obj[field] ? addonStatetoCost[field] : 0;
        }
    });
    total = roundTo(total, 2);

    return (
        <div className="flex flex-col gap-y-4 my-4">
            {Object.keys(obj).map((field) => {
                return field == "personalityInfo" ? (
                    Object.keys(obj["personalityInfo"]).map(
                        (pfield) =>
                            obj["personalityInfo"][pfield] && (
                                <div className="flex justify-between">
                                    <p>{stateFieldNameMap[pfield]}</p>
                                    <p>$9.95</p>
                                </div>
                            )
                    )
                ) : field == "basicInfo" ? (
                    Object.keys(obj["basicInfo"]).map(
                        (field) =>
                            obj["basicInfo"][field] && (
                                <div className="flex justify-between">
                                    <p>{basicInfoFieldLabelMap[field]}</p>
                                    <p>$9.95</p>
                                </div>
                            )
                    )
                ) : field == "totalPaidPhotos" && obj["totalPaidPhotos"] != 0 ? (
                    <div className="flex justify-between">
                        <p>Photo/Artworks</p>
                        <p>${roundTo(9.95 * obj["totalPaidPhotos"], 2)}</p>
                    </div>
                ) : field == "wordLimit" && obj["wordLimit"] != 0 ? (
                    <div className="flex justify-between">
                        <p>Bio word Limit</p>
                        <p>${roundTo(9.95 * obj["wordLimit"], 2)}</p>
                    </div>
                ) :
                    field == "premiumPlacement" && obj["premiumPlacement"] != 0 ? (
                        <div className="flex justify-between">
                            <p>{addonStateToNameMap[field]}</p>
                            <p>${roundTo(24.95 * obj["premiumPlacement"], 2)}</p>
                        </div>
                    ) :
                        field == "featuredPlacement" && obj["featuredPlacement"] != 0 ? (
                            <div className="flex justify-between">
                                <p>{addonStateToNameMap[field]}</p>
                                <p>${roundTo(24.95 * obj["featuredPlacement"], 2)}</p>
                            </div>
                        ) : (
                            obj[field] == true && (
                                <div className="flex justify-between">
                                    <p>{addonStateToNameMap[field]}</p>
                                    <p>${addonStatetoCost[field]}</p>
                                </div>
                            )
                        );
            })}

            <hr />
            <div className="flex justify-between">
                <p>Total</p>
                <p>${total}</p>
            </div>
        </div>
    );
};

export default PaymentReceipt