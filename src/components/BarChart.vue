<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['Spending', 'Budget', 'Months'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.Months,
      datasets: [
        {
          label: 'Expenses',
          backgroundColor: '#de230e',
          data: this.Spending
        },
        {
          label: 'Budget',
          backgroundColor: '#0c5e04',
          data: this.Budget
        }
      ]
    })
  }
}
</script>