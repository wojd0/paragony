from models import Receipt, ReceiptItem, ReceiptMetadata


def round_price(price: float) -> float:
    return round(price * 100) / 100


def parse_scan_response(response: dict) -> Receipt:
    items = []
    for item in response.get("items", []):
        items.append(ReceiptItem(
            name=item["name"],
            amount=item["amount"],
            pricePerUnit=round_price(item["pricePerUnit"]),
            reductionPerUnit=round_price(item["reductionPerUnit"]),
            totalPrice=round_price(item["totalPrice"]),
            selectedFlags=[],
        ))

    raw_metadata = response.get("metadata", {})
    metadata = ReceiptMetadata(
        nameAddress=raw_metadata.get("nameAddress"),
        dateUtc=raw_metadata.get("dateUtc"),
        currency=raw_metadata.get("currency"),
    )

    return Receipt(
        items=items,
        metadata=metadata,
        total=round_price(response.get("total", 0)),
    )
