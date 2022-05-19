$(function() {
  // 点击切换效果
  $('#link_reg').click(() => {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').click(() => {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  // 获取form
  const form = layui.form
  // 定义表单验证规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    repwd: (val) => {
      const pwd = $('.reg-box [name=password]').val()
      if (val !== pwd) return '两次输入的密码不一致！'
    }
  })
  //   const baseUrl = 'http://www.liulongbin.top:3007'
  const layer = layui.layer
  //   监听表注册单提交事件，发送注册请求
  $('#form_reg').on('submit', e => {
    // 阻止默认提交事件
    e.preventDefault()
    // 发送ajax请求
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      },
      success: res => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功！')
        $('#link_login').click()
      }
    })
  })
  // 监听登录表单提交事件，发送登录请求
  $('#form_login').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: res => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('登录成功')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})