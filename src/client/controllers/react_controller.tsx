import '../react_config';

// Flamework imports
import { Controller, type OnStart } from '@flamework/core';

// React imports
import React, { type FC } from '@rbxts/react';
import { useAtom } from '@rbxts/react-charm';
import { createPortal, createRoot } from '@rbxts/react-roblox';

// Service imports
import { Players } from '@rbxts/services';

// Atom imports
import { atoms } from '@shared/react/atoms';
import { react as react_path } from '@shared/lib/paths';

// App Component
interface Props {
  pageMap: Map<string, FC>;
}

function App({ pageMap }: Props) {
  const current_page = useAtom<string | undefined>(atoms.uiPage);
  const Page = pageMap.get(current_page ?? '') as FC | undefined;

  return (
    <screengui key="REACT_ROOT" ResetOnSpawn={false} IgnoreGuiInset>
      {Page === undefined ? <></> : <Page />}
    </screengui>
  );
}

@Controller()
export class ReactController implements OnStart {
  private root = createRoot(new Instance('Folder'));
  private page_map = new Map<string, FC>();

  public onStart() {
    
    atoms.uiPage('HUD');

    for (const page of react_path.WaitForChild('pages').GetChildren()) {
      if (!page.IsA('ModuleScript')) continue;

      const page_module = require(page) as { default?: FC };
      if (!page_module.default) continue;

      this.page_map.set(page.Name, page_module.default);
    }

    this.root.render(
      createPortal(
        <App pageMap={this.page_map} />,
        Players.LocalPlayer.WaitForChild('PlayerGui'),
      ),
    );
  }
}
