import { describe, expect, test } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import { log, renderWithRouter } from './utils/testUtils'
import { path } from './constants/path'

expect.extend(matchers)

describe('App', () => {
  test('App render va chuyen trang', async () => {
    /**
     * Test app thì BrowserRouter
     *  khi chạy mỗi component App thì lỗi useRouteElement vì Route element phải nằm trong BrowserRouter
     */
    const { user } = renderWithRouter({ router: '/' })
    /**
     * Đây là hàm để khi app chúng ta tốn 1 tgian nhất định để render thì nó sẽ đợi để render xong
     *  vì khi chạy App thì nó sẽ mặc định chạy vào trnag ProductList nhưng lần đầu vào render thì chưa
     *  có thể render ra đc, nó mới chỉ render Header và Footerr, nên sẽ có function waitFor nhận vào call
     * back callbak sẽ gọi vài lần nghĩa  là đợi cho app render mặc  định là 1000ms vài lần để nó ra đc html
     *
     *  waitFor sẽ run callback 1 vài lần
     *  cho đến khi hết time out mặc định là 1000ms  hoặc expect pass
     *  số lần run phụ thuộc vào timepout= 1000ms và interval =500 ms
     *
     */

    await waitFor(
      () => {
        expect(document.querySelector('title')?.textContent).toBe('Trang chủ shopee')
      },
      {
        timeout: 1000
      }
    )
    /** Chuyển trang login */
    user.click(screen.getByText('Đăng nhập'))
    await waitFor(() => {
      expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Login')
    })

    screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })

  test('Về trang not found', async () => {
    const badRoute = '/some/bad/route'
    renderWithRouter({ router: badRoute })

    // expect(screen.getByText('Page Not Found')).toBeInTheDocument()
    await log()
    screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })
  test('Vao trang dang ky', async () => {
    renderWithRouter({ router: path.register })
    expect(screen.getByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
    // screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })
})
