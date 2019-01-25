import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types'

// import { Provider } from 'react-redux'
// import store from './store'

// import { connect } from 'react-redux'
// import { increment, decrement, reset } from './actionCreators'

import './index.css';
import {quadraEnum, eiEnum, eiTitle, pjEnum, pjTitle, quadraField, cpEnum, cpGroups, cpGroupTitle, cpGroupField, cpTitle, tnEnum, itEnum, tnTitle, itTn, itTitle} from './data.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'tn',
      tn: null,
      cp: null,
      it: null,
      sex: 'male',
      mad: null,
    };
  }
  selectPage(page) {
    this.setState({page})
  }
  clearState() {
    this.setState({tn: null, cp: null, it: null, sex: 'male', mad: null});
  }
    (state) {
    this.setState(state)
  }
  render() {
    const pageDef = {
      'tn': { title: 'Соционические типы', },
      'cp': { title: 'Соционические функции', },
      'it': { title: 'Интертипные отношения', },
      'ma': { title: 'Модель А для всех типов', },
    };
    const htmlContent = (page) => {
      switch (page) {
        case 'cp': return (<CpPage cp={this.state.cp} setNewState={(state) => this.setNewState(state)}/>)
        case 'it': return (<ItPage tn={this.state.tn} it={this.state.it} setNewState={(state) => this.setNewState(state)}/>)
        case 'ma': return (<MaPage tn={this.state.tn} sex={this.state.sex} it={this.state.it} cp={this.state.cp} mad={this.state.mad} setNewState={(state) => this.setNewState(state)}/>)
        default: return (<TnPage tn={this.state.tn} sex={this.state.sex} setNewState={(state) => this.setNewState(state)}/>)
      }
    };
    return (
      <div>
        <div className={"selectionIndicator " + (this.state.tn || this.state.cp || this.state.it ? 'visibility' : '')}>
          <a href='#' onClick={() => this.clearState()}>убрать желтый цвет со страницы</a>
        </div>
        <table className="b1 main">
          <thead>
            <tr>
              <td>{
                Object.keys(pageDef).map((page) => {
                  if (page === this.state.page) {
                    return (
                      <span key={page} className="b3 b2">{pageDef[page].title}</span>
                    )
                  } else {
                    return (
                      <a
                        key={page}
                        href="#"
                        className="b2 b4"
                        onClick={() => this.selectPage(page)}
                      >{pageDef[page].title}</a>
                    )
                  }
                })
              }</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{htmlContent(this.state.page)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const MaPage = ({tn, sex, cp, it, mad, setNewState}) => (
<table>
  <tbody>
    <tr>
      <td><ModelAForAllTypes tn={tn} cp={cp} it={it} setNewState={setNewState}/></td>
      <td><MaDescription tn={tn} sex={sex} cp={cp} it={it} mad={mad} setNewState={setNewState}/></td>
    </tr>
  </tbody>
</table>
)
MaPage.propTypes = {
  it: PropTypes.oneOf(itEnum),
  tn: PropTypes.oneOf(tnEnum),
  setNewState: PropTypes.func.isRequired,
}

const ModelAForAllTypes = () => (<span>ModelAForAllTypes</span>)
const MaDescription = () => (<span>MaDescription</span>)

const ItPage = ({tn, it, setNewState}) => (
<div className="a30">
  <table className="a31">
    <colgroup>
      <col className="a32"/>
      <col className="a33"/>
    </colgroup>
    <tbody>
      <tr>
        <td>
          <table className="a35">
            <colgroup>
              <col className="a36"/>
              <col className="a38"/>
            </colgroup>
            <tbody>
              {itEnum.map((itCode, itIdx) => (
                <tr key={itCode}>
                  {tn && (
                    <td className={itCode === it ? 'a40': ''}>
                      <span className={"a" + (42 + itIdx)}>{tnTitle(tn)}</span>
                      -
                      <span className="a58">{tnTitle(itTn(itCode, tn))}</span>
                    </td>
                  )}
                  <td className={itCode === it ? 'a40' : ''}>
                    {itCode === it ? (
                      <span className="a41">{itTitle(itCode, tn)}</span>
                    ) : (
                      <a
                        href='#'
                        onClick={() => setNewState({it: itCode, mad: 'it'})}
                      >{itTitle(itCode, tn)}</a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
        <td><TnTable tn={tn} setNewState={setNewState}/></td>
      </tr>
    </tbody>
  </table>
  {it && (<ItDescription it={it}/>)}
</div>
)
ItPage.propTypes = {
  it: PropTypes.string,
  tn: PropTypes.string,
  setNewState: PropTypes.func.isRequired,
}

const ItDescription = ({it}) => (
  <span>{itTitle(it)}</span>
)
ItDescription.propTypes = {
  it: PropTypes.oneOf(itEnum)
}

const CpPage = ({cp, setNewState}) => (
<table className="a16">
<tbody>
  <tr>
    <td>
      <table className="a17">
        <colgroup>
          <col className="a19"/>
          <col className="a20"/>
          <col className="a21"/>
        </colgroup>
        <tbody>
          {
            cpGroups.map((cpGroup, cpGroupIdx) => {
              const groupTitle = cpGroupTitle(cpGroup)
              const result = eiEnum.map((ei, eiIdx) => (
                <Page_cpRow
                  key={'cp-' + cpGroupIdx + '-' + eiIdx}
                  eiIdx={eiIdx}
                  cp={cp}
                  groupTitle={groupTitle}
                  cpCode={cpGroupField(cpGroup, ei, "code")}
                  cpTitle={cpGroupField(cpGroup, ei, "title")}
                  setNewState={setNewState}
                />
              ))
              return result
            })
          }
        </tbody>
      </table>
    </td>
    {/*<td> <CpDescription/> </td>*/}
  </tr>
</tbody>
</table>
)
CpPage.propTypes = {
  tn: PropTypes.string,
  setNewState: PropTypes.func.isRequired,
}

const Page_cpRow = ({groupTitle, cp, cpCode, cpTitle, eiIdx, setNewState}) => (
<tr>
  {eiIdx === 0 && <td rowSpan="2" className="a18">{groupTitle}</td>}
  <td className={"a24 " + (cp === cpCode && "selected" )}>
    <CpIcon cp={cp} cpCode={cpCode} titlePrefix="" setNewState={setNewState}/>
  </td>
  { cp === cpCode ?
    <td className="a25 selected">{cpTitle}</td> :
    <td
      className="a25"
    ><a
      onClick={() => setNewState({cp: cpCode})}
      href='#'
    >{cpTitle}</a></td>
  }
</tr>
)
Page_cpRow.propTypes = {
  groupTitle: PropTypes.string.isRequired,
  cp: PropTypes.string,
  cpCode: PropTypes.oneOf(cpEnum),
  cpTitle: PropTypes.string.isRequired,
  eiIdx: PropTypes.number.isRequired,
  setNewState: PropTypes.func.isRequired,
}

const CpIcon = ({cp, cpCode, titlePrefix, setNewState}) => {
  const title = ({titlePrefix, cpCode}) => (
    (titlePrefix ? titlePrefix : "" ) + cpTitle(cpCode)
  )
  return cp == cpCode ? (
    <div
      className={"selected icon " + cpCode}
      title={title({titlePrefix, cpCode})}
    ></div>
  ) : (
    <a
      className={"icon " + cpCode}
      title={title({titlePrefix, cpCode})}
      onClick={() => setNewState({cp: cpCode})}
      href='#'
    > </a>
  )
}
CpIcon.propTypes = {
  cp: PropTypes.string,
  cpCode: PropTypes.oneOf(cpEnum),
  titlePrefix: PropTypes.string,
  setNewState: PropTypes.func.isRequired,
}

const TnPage = ({tn, sex, setNewState}) => (
<table className="a0">
  <tbody>
    <tr>
      <td><TnTable tn={tn} setNewState={setNewState}/></td>
    </tr>
  {tn && (<td><TnDescription tn={tn} sex={sex}/></td>)}
  </tbody>
</table>
)
TnPage.propTypes = {
  tn: PropTypes.string,
  sex: PropTypes.oneOf(sexEnum),
  setNewState: PropTypes.func.isRequired,
}

const TnTable = ({tn, setNewState}) => (
<table className="a1">
  <colgroup>
    <col className="col1"/>
    <col className="col2"/>
    <col className="col3"/>
  </colgroup>
  <tbody>
  {quadraEnum.map(quadra => {
    return [
      <tr
        key={quadra + '-tr'}
        >
        <td className="a2">{quadra} квадра</td>
        {eiEnum.map(ei => (
          <td key={quadra + '-' + ei} className="a3">{eiTitle(ei)}</td>
        ))}
      </tr>,
    ].concat(
      pjEnum.map(pj => {
        return (
          <tr key={quadra + '-' + pj}>
            <td className="a4">{pjTitle(pj)}</td>
            {
              eiEnum.map(ei => {
                return (
                  <td key={quadra + '-' + pj + '-' + ei} className="a5">
                    <TnLink
                      tn={tn}
                      tnCode={quadraField(quadra, pj, ei, "code")}
                      tnTitle={quadraField(quadra, pj, ei, "title")}
                      setNewState={setNewState}
                    />
                  </td>
                )
              })
            }
          </tr>
        )
      })
    )
  })}
  </tbody>
</table>
)
TnTable.propTypes = {
  tn: PropTypes.string,
  setNewState: PropTypes.func.isRequired,
}

const TnLink = ({tn, tnCode, tnTitle, setNewState}) => (
  tn === tnCode ?
  (
    <span className="selected">{tnTitle}</span>
  ) :
  (
    <a
      href='#'
      title={tnTitle}
      onClick={() => setNewState({tn: tnCode})}
    >{tnTitle}</a>
  )
)

// ========================================

ReactDOM.render(
  <App />,
  // <Provider store={store}>
 //    <TodoApp />
  // </Provider>,

  document.getElementById('root')
);
