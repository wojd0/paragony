import './resultPanel.css';

export default function ResultPanel() {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full receipt-table">
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
        </div>
    );
}