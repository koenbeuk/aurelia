import { ILifecycle, IView, IViewFactory, Lifecycle } from '../../src/index';
import { FakeView } from './fake-view';

export class FakeViewFactory implements IViewFactory {
  public static inject = [ILifecycle];
  public name: string;
  public isCaching: boolean;
  constructor(public $lifecycle: Lifecycle) {}
  public canReturnToCache(view: IView): boolean {
    return false;
  }
  public tryReturnToCache(view: IView): boolean {
    return false;
  }
  public setCacheSize(size: number | '*', doNotOverrideIfAlreadySet: boolean): void {}
  public create(): IView {
    return new FakeView(this.$lifecycle);
  }
}
