import { useSelector } from "react-redux";
import { calculateTotalCost, roundTo } from "../utils/sharedMethods";
import { addonStatetoCost, addonStateToNameMap, basicInfoFieldLabelMap, stateFieldNameMap } from "../utils/sharedState";
function PaymentReceipt({ obj, unBilledFields = [], onDelReceiptItem, pendingDuesSection }) {
    const user = useSelector((state) => state.user.currentUser);
    let total = calculateTotalCost(obj)

    const unGroupFieldsMap = {
        "totalPaidPhotos": "Photos/Artworks",
        "wordLimit": "Bio word limit"
    }

    return (
        <div className="flex flex-col gap-y-4 my-4">
            {Object.keys(obj).map((field) => {
                return field == "personalityInfo" ? (
                    Object.keys(obj["personalityInfo"]).map(
                        (field) =>
                            obj["personalityInfo"][field] && (
                                <RecieptItem field={field} cost={9.95} nameMap={stateFieldNameMap} onDelReceiptItem={onDelReceiptItem} type={"personalityInfo"} />
                            )
                    )
                ) : field == "basicInfo" ? (
                    Object.keys(obj["basicInfo"]).map(
                        (field) =>
                            obj["basicInfo"][field] && (
                                <RecieptItem field={field} cost={9.95} unBilledFields={unBilledFields} pendingDuesSection={pendingDuesSection} nameMap={basicInfoFieldLabelMap} onDelReceiptItem={onDelReceiptItem} type={"basicInfo"} />
                            )
                    )
                ) : field == "totalPaidPhotos" && obj["totalPaidPhotos"] != 0 ? (
                    <RecieptItem field={field} cost={roundTo(9.95 * obj[field], 2)} onDelReceiptItem={onDelReceiptItem} nameMap={unGroupFieldsMap} />
                ) : field == "wordLimit" && obj["wordLimit"] != 0 ? (
                    <RecieptItem field={field} cost={roundTo(9.95 * obj[field], 2)} onDelReceiptItem={onDelReceiptItem} nameMap={unGroupFieldsMap} />
                ) :
                    field == "premiumPlacement" && obj["premiumPlacement"] != 0 ? (
                        <RecieptItem field={field} cost={roundTo(24.95 * obj[field], 2)} onDelReceiptItem={onDelReceiptItem} nameMap={addonStateToNameMap} />
                    ) :
                        field == "featuredPlacement" && obj["featuredPlacement"] != 0 ? (
                            <RecieptItem field={field} cost={roundTo(14.95 * obj[field], 2)} onDelReceiptItem={onDelReceiptItem} nameMap={addonStateToNameMap} />
                        ) : (
                            obj[field] == true && (
                                <RecieptItem field={field} cost={addonStatetoCost[field]} onDelReceiptItem={onDelReceiptItem} nameMap={addonStateToNameMap} />
                            )
                        );
            })}

            <hr />
            <div className="flex justify-between">
                <p>Total</p>
                <p>${total}</p>
            </div>
            {user?.referralBalance && user?.referralBalance>0 && (
            <div className="flex justify-between">
                <p>Referral Balance</p>
                <p>${user?.referralBalance}</p>
            </div>
            )}
        </div>
    );

};


function RecieptItem({ field, nameMap, cost, onDelReceiptItem, unBilledFields = [], pendingDuesSection, type }) {
    if (unBilledFields) {
        console.log(
            unBilledFields
        )
        console.log("fieldName", JSON.stringify(field), "exsit", unBilledFields.includes(field))
    }
    console.log("unbilledFields", unBilledFields, "pendingsection", pendingDuesSection, "field", field)
    if (pendingDuesSection && unBilledFields.includes(field)) {
        return null
    }

    return <div className="flex justify-between">
        <p>{nameMap[field]}</p>
        <p className="flex gap-x-8">${unBilledFields.includes(field) ? 0 : cost}
            {onDelReceiptItem &&
                <img src="/assets/icons/xMarkGray.svg" onClick={() => onDelReceiptItem(field, type)} alt="" className=" h-6 cursor-pointer  rounded hover:bg-gray-200 px-1 p-0.5" />
            }
        </p>
    </div>
}

export default PaymentReceipt