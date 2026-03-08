from pydantic import BaseModel


class ReceiptItem(BaseModel):
    name: str
    amount: float
    pricePerUnit: float
    reductionPerUnit: float
    totalPrice: float
    selectedFlags: list[str] = []


class ReceiptMetadata(BaseModel):
    nameAddress: str | None = None
    dateUtc: str | None = None
    currency: str | None = None


class Receipt(BaseModel):
    items: list[ReceiptItem]
    metadata: ReceiptMetadata = ReceiptMetadata()
    total: float
