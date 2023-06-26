import './FieldsAnalytic.scss'
import DefaultDiagram from '../../diagrams/DefaultDiagram/DefaultDiagram'
import AngleCircleDiagram from '../../diagrams/AngleCircleDiagram/AngleCircleDiagram'

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
