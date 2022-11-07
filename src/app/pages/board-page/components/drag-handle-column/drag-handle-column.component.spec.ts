import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragHandleColumnComponent } from './drag-handle-column.component';

describe('DragHandleColumnComponent', () => {
  let component: DragHandleColumnComponent;
  let fixture: ComponentFixture<DragHandleColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragHandleColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DragHandleColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
