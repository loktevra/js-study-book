export function prepareAnswer(data) {
  return { result: { model: { message: JSON.stringify(data) }}}
}

export function prepareSuccessAnswer(data) {
  return prepareAnswer({ status: 'success', data });
}

export function prepareFailAnswer(errors) {
  return prepareAnswer({ status: 'fail', errors });
}
