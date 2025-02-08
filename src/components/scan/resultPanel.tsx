import AdditionalMetadata from "./additionalMetdata";

export default function ResultPanel() {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full receipt-table">
                <colgroup>
                    <col span={1} className="w-1/2" />
                    <col span={1} className="w-1/4" />
                    <col span={1} className="w-1/4" />
                </colgroup>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Item 1</td>
                        <td>2</td>
                        <td>$10</td>
                    </tr>
                    <tr>
                        <td>Item 2</td>
                        <td>1</td>
                        <td>$20</td>
                    </tr>
                    <tr>
                        <td>Item 3</td>
                        <td>3</td>
                        <td>$15</td>
                    </tr>
                    <tr className="border-t-2">
                        <td></td>
                        <td>Total</td>
                        <td>$75</td>
                    </tr>
                </tbody>
            </table>
            <AdditionalMetadata metadata={[{name: 'Store', value: 'Biedronka, Polska'}]} />
        </div>
    );
}