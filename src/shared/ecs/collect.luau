--!nonstrict
--// TODO: Remake this in typescript entirely 😭
type Signal<T...> = { [any]: any }
type Cleanup = () -> ()

local function collect<T...>(event: (listener: (T...) -> ()) -> Cleanup | Signal<T...>, prefire: () -> { any } | any)
  local storage = {}
  local mt = {}

  prefire = prefire and prefire()

  if prefire then
    if typeof(prefire) ~= 'table' then
      prefire = { prefire }
    end
  else
    prefire = {}
  end

	local iter = function()
		local n = #storage
		return function()
			if n <= 0 then
				mt.__iter = nil
				return nil
			end

			n -= 1
			return n + 1, unpack(table.remove(storage, 1) :: any)
		end
	end

  for _,v in prefire do
    table.insert(storage, { v })
    mt.__iter = iter
  end

	local disconnect
	if type(event) == "function" then
		disconnect = event(function(...)
			table.insert(storage, { ... })
			mt.__iter = iter
		end)
	elseif event['Connect'] ~= nil then
    disconnect = event:Connect(function(...)
			table.insert(storage, { ... })
			mt.__iter = iter
		end)
	elseif event['connect'] ~= nil then
		disconnect = event:connect(function(...)
			table.insert(storage, { ... })
			mt.__iter = iter
		end)
  end

	setmetatable(storage, mt)
	return {(storage :: any) :: () -> (number, T...), function()
		if typeof(disconnect) == 'function' then
      disconnect()
    elseif disconnect['Disconnect'] then
      disconnect:Disconnect()
    elseif disconnect['disconnect'] then
      disconnect:disconnect()
    end
	end}
end

return { collect = collect }