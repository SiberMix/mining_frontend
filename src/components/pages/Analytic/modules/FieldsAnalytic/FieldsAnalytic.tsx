import './FieldsAnalytic.scss'
import DefaultDiagram from '../../dashboards/DefaultDiagram/DefaultDiagram'
import AngleCircleDiagram from '../../dashboards/AngleCircleDiagram/AngleCircleDiagram'

const FieldsAnalytic = () => {
  return (
    <div className="fields-analytic-wrapper">
      <div className="fields-analytic-wrapper-main">
        <div className="fields-analytic-diagram-main">
          <DefaultDiagram />
          <div />
        </div>
      </div>
      <div className="fields-analytic-wrapper-side">
        <div className="fields-analytic-diagram-side">
          <AngleCircleDiagram />
        </div>
      </div>
    </div>
  )
}

export default FieldsAnalytic
