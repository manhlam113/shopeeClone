import { beforeAll, describe, expect, test } from 'vitest'
import { log, renderWithRouter } from '../../utils/testUtils'
import { path } from '../../constants/path'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

describe('Login', () => {
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement

  beforeAll(async () => {
    renderWithRouter({ router: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })
    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
  })

  test('Hiển thị lỗi khi không nhập gì', async () => {
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(screen.queryByText('Email là bắt buộc')).toBeTruthy()
      expect(screen.queryByText('Password là bắt buộc')).toBeTruthy()
    })
  })

  test('Hiển thị lỗi khi nhập liệu input sai', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'test12@mail'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123'
      }
    })
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeTruthy()
      expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeTruthy()
    })
  })

  test('Không hiển thị lỗi khi đúng email và password', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'manhvanlam@gmail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123123123'
      }
    })

    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy()
      expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeFalsy()
    })
    fireEvent.submit(submitButton)
    await log()
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ shopee')
    })
  })
})
