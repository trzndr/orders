/**
 * Extract results of modal_view JSON with the relevant keys
 * @param val
 * @returns {*[]}
 *
 *  Example:
   [
        id_order_id: { type: 'plain_text_input', value: '123' },
        id_supplier_narme: { type: 'plain_text_input', value: 'test' },
        id_responsible: { type: 'multi_users_select', selected_users: [ 'U02K5EA75GR' ] },
        id_datepicker: { type: 'datepicker', selected_date: '2021-10-21' }
    ]
 *
 */
const extractKeysOfModalViewSubmitResult = (val) => {
    var val_formatted = [];

    for(const k in val){
        for(const k2 in val[k]) {
            val_formatted[k2] = val[k][k2];
        }
    }
    return val_formatted;
}

module.exports={extractKeysOfModalViewSubmitResult};