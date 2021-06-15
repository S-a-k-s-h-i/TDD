// It defines the status in which the product bid is currently in
export enum ProductBidStatus {
    AWAITING_SELLER_CONFIRMATION = 'awaiting_seller_confirmation',
    AWAITING_BUYER_CONFIRMATION = 'awaiting_buyer_confirmation',
    OFFER_ACCEPTED = 'offer_accepted',
    OFFER_REJECTED_BY_SELLER = 'offer_rejected_by_seller',
    OFFER_REJECTED_OUTBIDDEN = 'offer_rejected_outbidden',
}